#!/usr/bin/perl
# Builds data/content-blocks.json from the verbatim source-archive text files.
# Each source file is split into blocks at section headings ("> ") and at the
# source documents' own block markers (BANNER, CARDS, STEPS, ...). Text is copied
# byte-for-byte; nothing is rewritten. Run from docs/website-architecture/.
use strict; use warnings;
use Encode qw(decode encode);

my %MARKERS = map { $_ => 1 } qw(BANNER CAROUSEL CARDS HERO STEPS CALLOUT FITLIST STATS TEAM);
my @files = (glob('source-archive/pages/*.txt'), glob('source-archive/insights/*.txt'));

sub js { my $s = shift; $s =~ s/\\/\\\\/g; $s =~ s/"/\\"/g; $s =~ s/\t/\\t/g; return "\"$s\""; }

my @records;
for my $f (@files) {
  open my $fh, '<:encoding(UTF-8)', $f or die "$f: $!";
  my @lines = <$fh>; close $fh; chomp @lines;
  my ($src) = $f =~ m{/(TT-[A-Z]+-\d+)};
  my %meta; my $i = 0;
  while ($i < @lines && $lines[$i] !~ /^=+$/) {
    $meta{lc $1} = $2 if $lines[$i] =~ /^([A-Z ]+): (.*)$/; $i++;
  }
  $i++;
  my @blocks; my $cur;
  my $open = sub { my ($type, $heading, $ln) = @_;
    $cur = { type => $type, heading => $heading, start => $ln, lines => [] }; push @blocks, $cur; };
  $open->('intro', '', $i + 1);
  for (; $i < @lines; $i++) {
    my $l = $lines[$i]; my $ln = $i + 1;
    if ($l =~ /^> (.+)$/)           { $open->('section', $1, $ln); next; }
    if ($MARKERS{$l})               { $open->(lc $l, $cur->{type} eq 'section' && !@{$cur->{lines}} ? $cur->{heading} : '', $ln);
                                      # an empty heading-only section is absorbed into the marked block
                                      if (@blocks > 1 && $blocks[-2]{type} eq 'section' && !@{$blocks[-2]{lines}}) { splice @blocks, -2, 1; }
                                      next; }
    # contact page: the form has no heading tag in the source, only this label
    if ($src eq 'TT-PG-005' && $l eq 'Send us a message') { $open->('form', $l, $ln); next; }
    if ($l =~ /^CTA2?: /)         { $open->('cta', '', $ln) unless $cur->{type} eq 'cta'; }
    push @{$cur->{lines}}, $l; $cur->{end} = $ln;
  }
  @blocks = grep { @{$_->{lines}} } @blocks;
  my $n = 0;
  for my $b (@blocks) {
    $n++;
    push @records, sprintf(
      "  {\"block_id\": %s, \"source_id\": %s, \"source_file\": %s, \"original_url\": %s, \"source_document\": %s, \"block_type\": %s, \"heading\": %s, \"archive_lines\": \"%d-%d\", \"preservation_status\": \"preserved-verbatim\", \"text\": [%s]}",
      js(sprintf('%s-B%02d', $src, $n)), js($src), js($f), js($meta{'original url'} // ''), js($meta{source} // ''),
      js($b->{type}), js($b->{heading}), $b->{start}, $b->{end} // $b->{start},
      join(', ', map { js($_) } @{$b->{lines}}));
  }
}
open my $out, '>:encoding(UTF-8)', 'data/content-blocks.json' or die $!;
print $out "[\n", join(",\n", @records), "\n]\n";
close $out;
print scalar(@records), " blocks written\n";
