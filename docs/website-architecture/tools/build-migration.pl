#!/usr/bin/perl
# Maps every block in data/content-blocks.json to its destination in the new
# structure. Writes data/migration-map.csv and prints a markdown table.
# Fails if any block is unmapped. Run from docs/website-architecture/.
use strict; use warnings;
use Encode qw(decode);

my %slug = (
  'TT-INS-001' => 'mastering-kaizen-events',
  'TT-INS-002' => 'two-quarters-of-migration-work-cleared-in-a-single-day',
  'TT-INS-003' => 'seven-year-migration-closed-in-19-hours',
  'TT-INS-004' => 'weekend-scrum-to-kanban-migration-across-nine-teams',
  'TT-INS-005' => 'value-stream-mapping-9-5-hours-of-work-in-208-days',
  'TT-INS-006' => 'executing-the-wrong-plan',
  'TT-INS-007' => 'the-19-hour-project-rapid-execution',
  'TT-INS-008' => 'look-at-the-handoffs-not-the-steps',
  'TT-INS-009' => 'decentralized-purchasing-destroys-margins',
  'TT-INS-010' => 'why-transformation-programs-fail-after-a-strong-start',
);
my %attrib_missing = map { $_ => 1 } qw(TT-INS-007 TT-INS-008 TT-INS-009 TT-INS-010);

# block_id => [destination, section, treatment, refs, notes]
my %map = (
  'TT-GL-001-B01' => ['Global header/footer', 'Navigation + logo', 'restructure', 'D-22', 'Nav labels/order change to Concept 06; Google Sites chrome ("Report abuse", "Page updated", "Search this site") retired as platform UI, not company content; logo TT-AS-018'],
  'TT-PG-001-B01' => ['/', 'Challenges (problem statements)', 'verbatim', '', 'Four statements with their attribution lines'],
  'TT-PG-001-B02' => ['/', 'Hero', 'verbatim + new H1', 'D-01 N-01', '"Clarity before Execution." kept as hero lead-in or secondary heading per D-01; both subtext lines verbatim; background TT-AS-001'],
  'TT-PG-001-B03' => ['/', 'Challenges (problem cards)', 'verbatim', '', 'Six cards; each links to a related Expertise component (08)'],
  'TT-PG-001-B04' => ['/', 'Approach (Our Method intro)', 'verbatim', '', ''],
  'TT-PG-001-B05' => ['/', 'Approach (five steps)', 'verbatim', '', 'Also reusable on /services'],
  'TT-PG-001-B06' => ['/', 'Outcome callout', 'verbatim', 'C-15', ''],
  'TT-PG-001-B07' => ['/services', 'Fit list (canonical)', 'consolidated', 'D-14', 'Identical to TT-PG-002-B06; Home keeps a link "Is this the right fit?" to /services#fit (N)'],
  'TT-PG-001-B08' => ['/', 'Evidence (stats)', 'verbatim, gated', 'D-04 D-05 C-01 C-04 C-05 C-06 C-07 N-15', 'Each figure renders only when verified, with its D-04 attribution; C-01 label withdrawn (source archived) and replaced per N-15'],
  'TT-PG-001-B09' => ['/', 'Conversation CTA', 'verbatim text, URL updated', 'D-20', 'CTA2 "See Our Work" retargeted /about-us -> /insights/case-studies'],
  'TT-PG-002-B01' => ['/services', 'Banner', 'verbatim', '', 'Background TT-AS-002'],
  'TT-PG-002-B02' => ['/services', 'Our Offer', 'verbatim', '', ''],
  'TT-PG-002-B03' => ['/services', 'Signature offer callout', 'verbatim', 'C-15', ''],
  'TT-PG-002-B04' => ['/services', 'Our Engagement (4 types)', 'verbatim', '', 'Transformation Recovery step also excerpted on /services/transformation-recovery (P1)'],
  'TT-PG-002-B05' => ['/services', 'The Components (6)', 'verbatim', 'D-02', 'Each card links to related insights; Transformation Recovery card links to its detail page (P1)'],
  'TT-PG-002-B06' => ['/services', 'Fit list (canonical)', 'verbatim', 'D-14', 'Anchor #fit; referenced from Home, Contact and referral pathway'],
  'TT-PG-002-B07' => ['/services', 'Conversation CTA', 'verbatim text, URL updated', '', 'CTA2 "Read Our Case Studies" /blogs (404) -> /insights/case-studies; CTA1 /contact-us/ -> /contact-us'],
  'TT-PG-003-B01' => ['(retired)', '-', 'retire', '', 'Embed <title> "Tech Transpire — Insights": replaced by page metadata (10)'],
  'TT-PG-003-B02' => ['/insights', 'Intro', 'verbatim', '', 'Heading + intro line; "All" filter and loading strings are UI, replaced by Phase 2/3 equivalents'],
  'TT-PG-004-B01' => ['/about-us', 'Banner', 'verbatim', '', 'Background TT-AS-002'],
  'TT-PG-004-B02' => ['/about-us', 'Our Story', 'verbatim', '', ''],
  'TT-PG-004-B03' => ['/about-us', 'Our Values', 'verbatim', '', ''],
  'TT-PG-004-B04' => ['/about-us', 'Our Team', 'verbatim, gated', 'D-07 C-02 C-10 C-11 C-12 C-13 C-20 E-03 E-04', 'Profiles publish individually as confirmed; four Person entries; headshots TT-AS-003..006; LinkedIn URLs kept'],
  'TT-PG-004-B05' => ['/about-us', 'Our Message', 'verbatim', 'C-16', 'Five statements + closing line'],
  'TT-PG-004-B06' => ['/about-us', 'Conversation CTA', 'verbatim text, URL updated', '', 'CTA2 "See Our Case Studies" /blogs (404) -> /insights/case-studies'],
  'TT-PG-005-B01' => ['(retired)', '-', 'retire', '', 'Embed <title> and eyebrow "Get in touch": title replaced by metadata; eyebrow kept as Phase 2 option'],
  'TT-PG-005-B02' => ['/contact-us + footer + SiteSettings', 'Contact details', 'verbatim', '', 'Email, phone and LinkedIn held once in SiteSettings and reused'],
  'TT-PG-005-B03' => ['/contact-us', 'Book an intro call', 'verbatim', '', 'Booking URL held in SiteSettings'],
  'TT-PG-005-B04' => ['/contact-us', 'What happens next', 'verbatim', 'C-17', ''],
  'TT-PG-005-B05' => ['/contact-us', 'Form', 'replaced (approved)', 'D-12 N-09', 'Approved new field set (D-12): Name, Company, Work email, Phone (optional), Area of interest, Message, source, consent. Legacy labels/options archived, not deleted; Annual revenue removed. Success text kept verbatim'],
);

local $/; open my $fh, '<:encoding(UTF-8)', 'data/content-blocks.json' or die $!;
my $json = <$fh>; close $fh;
my @rows; my @missing;
while ($json =~ /"block_id": "([^"]+)", "source_id": "([^"]+)".*?"block_type": "([^"]+)", "heading": "((?:[^"\\]|\\.)*)"/g) {
  my ($id, $src, $type, $heading) = ($1, $2, $3, $4);
  my $m = $map{$id};
  if (!$m && $src =~ /^TT-INS/) {
    my $url = "/insights/$slug{$src}";
    my @refs; my $note = '';
    if    ($type eq 'banner') { $m = [$url, 'Article header', 'verbatim', 'D-09', 'Headline = H1; subtext = standfirst; "GDRIVE: your-logo-file-id" is an unfilled template placeholder, not an asset']; }
    elsif ($type eq 'cta')    { $m = [$url, 'Closing CTA', 'verbatim text, URL updated', ($attrib_missing{$src} ? 'D-04 E-07 C-18' : ''), 'Link targets mapped to new URLs (10 §7)' . ($attrib_missing{$src} ? '; attribution line added per D-04 once C-18 confirms pre-founding' : '')]; }
    else {
      $m = [$url, $heading ne '' ? $heading : "($type)", 'verbatim', '', ''];
      $m->[3] = 'E-05' if $id eq 'TT-INS-001-B11';
      $m->[4] = 'Card title styled as heading in source; restore as 4th card of B10' if $id eq 'TT-INS-001-B11';
      $m->[4] = 'First section heading repeats H1; kept in source, not rendered as second H1 (10 §6)' if $type eq 'section' && $id =~ /-B02$/ && $heading ne '';
      $m->[3] = 'E-01' if $id eq 'TT-INS-002-B06';
      $m->[3] = 'E-02 C-09' if $id eq 'TT-INS-004-B02';
      $m->[3] = 'C-07 C-18' if $id eq 'TT-INS-007-B03';
      $m->[4] = 'Separate engagement from TT-INS-003 unless verified (C-18); client description kept as written' if $id eq 'TT-INS-007-B03';
      $m->[3] = 'C-14 D-24 E-09' if $id eq 'TT-INS-003-B06';
      $m->[3] = 'C-08' if $id eq 'TT-INS-003-B07';
      $m->[3] = 'C-03' if $id eq 'TT-INS-009-B05';
    }
  }
  if (!$m) { push @missing, $id; next; }
  push @rows, [$id, @$m];
}
die "UNMAPPED BLOCKS: @missing\n" if @missing;

open my $csv, '>:encoding(UTF-8)', 'data/migration-map.csv' or die $!;
print $csv "block_id,destination,destination_section,treatment,decision_refs,notes\n";
for my $r (@rows) { print $csv join(',', map { my $v = $_ // ''; $v =~ s/"/""/g; "\"$v\"" } @$r), "\n"; }
close $csv;

binmode STDOUT, ':encoding(UTF-8)';
print "| Block | Destination | Section | Treatment | Refs | Notes |\n|---|---|---|---|---|---|\n";
for my $r (@rows) { my @c = map { my $v = $_ // ''; $v =~ s/\|/\\|/g; $v } @$r; $c[1] = "`$c[1]`" if $c[1] =~ m{^/}; print '| ', join(' | ', @c), " |\n"; }
my %by; $by{$_->[3]}++ for @rows;
print STDERR scalar(@rows), " blocks mapped, 0 unmapped. ", join('; ', map { "$_: $by{$_}" } sort keys %by), "\n";
