#!/usr/bin/perl
# Generates data/schema/*.schema.json (JSON Schema draft 2020-12) for the
# logical content models described in 09-content-schema.md.
# Run from docs/website-architecture/.
use strict; use warnings;
use JSON::PP;

my $dir = 'data/schema';
mkdir $dir unless -d $dir;
my $json = JSON::PP->new->pretty->canonical;
my $C = '_common.schema.json#/$defs';

sub str  { return { type => 'string', @_ } }
sub arr  { my $items = shift; return { type => 'array', items => $items, @_ } }
sub en   { return { enum => [@_] } }
sub ref_ { return { '$ref' => "$C/$_[0]" } }
sub rels { return arr(ref_('relation'), @_) }
sub pat  { return str(pattern => $_[0]) }

sub entity {
  my ($name, $title, $required, $props, %opt) = @_;
  my %p = %$props;
  $p{provenance} = ref_('provenance') unless $opt{no_provenance};
  my $doc = {
    '$schema' => 'https://json-schema.org/draft/2020-12/schema',
    '$id' => "$name.schema.json",
    title => $title,
    type => 'object',
    required => $required,
    properties => \%p,
  };
  $doc->{$_} = $opt{$_} for grep { $_ ne 'no_provenance' } keys %opt;
  write_file("$name.schema.json", $doc);
}

sub write_file {
  my ($file, $doc) = @_;
  open my $fh, '>:encoding(UTF-8)', "$dir/$file" or die "$file: $!";
  print $fh $json->encode($doc);
  close $fh;
}

my $date = str(format => 'date');
my $approval = { type => 'object', required => ['approved'],
  properties => { approved => { type => 'boolean' }, approved_by => str(), date => $date } };

# ---- shared definitions -------------------------------------------------
write_file('_common.schema.json', {
  '$schema' => 'https://json-schema.org/draft/2020-12/schema',
  '$id' => '_common.schema.json',
  title => 'Shared definitions',
  '$defs' => {
    slug => pat('^[a-z0-9]+(-[a-z0-9]+)*$'),
    path => pat('^/([a-z0-9-]+(/[a-z0-9-]+)*)?$'),
    relation => { type => 'object', required => ['id', 'basis'], additionalProperties => JSON::PP::false,
      properties => { id => str(), basis => str(minLength => 3,
        description => 'Block or article ID that justifies the relationship (08 §5)') } },
    seo => { type => 'object', required => ['meta_title', 'meta_description'],
      properties => { meta_title => str(maxLength => 60), meta_description => str(minLength => 70, maxLength => 160),
        canonical => str(format => 'uri'), robots => str(default => 'index,follow'), og_image => pat('^TT-AS-[0-9]{3}$') } },
    provenance => { type => 'object', required => ['source_block_ids', 'preservation_status', 'updated_at'],
      properties => {
        source_block_ids => arr(pat('^TT-[A-Z]+-[0-9]{3}(-B[0-9]{2})?$')),
        preservation_status => en(qw(preserved-verbatim edited-approved new-pending new-approved)),
        change_record => arr({ type => 'object', required => [qw(date field previous_text new_text approved_by)],
          properties => { date => $date, field => str(), previous_text => str(), new_text => str(),
            approved_by => str(), decision_id => pat('^[DE]-[0-9]{2}$') } }),
        approved_by => str(),
        updated_at => str(format => 'date-time') },
      description => 'Only preserved-verbatim, edited-approved and new-approved content may be published.' },
    status => en(qw(draft in-review published retired)),
  },
});

# ---- page and block -------------------------------------------------------
entity('page', 'Page', [qw(id slug title page_type seo sections status priority provenance)], {
  id => pat('^TT-PGN?-[0-9]{3}$'),
  slug => ref_('path'),
  title => str(description => 'Page H1'),
  nav_label => str(),
  parent_id => str(),
  page_type => en(qw(home landing capability industry insight-index insight-listing about contact legal system)),
  seo => ref_('seo'),
  sections => arr({ '$ref' => 'block.schema.json' }),
  status => ref_('status'),
  priority => en(qw(P0 P1 P2)),
  legacy_urls => arr(str()),
});

my $link = { type => 'object', required => ['label', 'target'], properties => { label => str(), target => str() } };
sub when_type {
  my ($t, $req, $props) = @_;
  return { if => { properties => { type => { const => $t } } }, then => { required => $req, properties => $props } };
}
my $items = sub { my ($req, %p) = @_; return arr({ type => 'object', required => $req, properties => \%p }) };
entity('block', 'Block (page or article section)', [qw(block_id type)], {
  block_id => str(),
  type => en(qw(banner carousel cards hero steps callout fitlist stats team cta richtext form reference-list)),
  anchor => str(),
  heading => str(),
}, allOf => [
  when_type('banner',   ['headline'], { headline => str(), subtext => str(), background => pat('^TT-AS-[0-9]{3}$') }),
  when_type('hero',     ['headline'], { headline => str(), subtext => str() }),
  when_type('carousel', ['items'], { items => $items->(['text'], text => str(), attribution => str()) }),
  when_type('cards',    ['items'], { items => $items->([qw(title body)], icon_key => str(), title => str(), body => str()) }),
  when_type('steps',    ['items'], { items => $items->([qw(title body)], title => str(), body => str()) }),
  when_type('callout',  [qw(heading body)], { title => str(description => 'Eyebrow label, e.g. "The outcome"'), body => str(), tag => str() }),
  when_type('fitlist',  ['items'], { items => $items->([qw(fit text)], fit => en(qw(yes no)), text => str()) }),
  when_type('stats',    ['claim_ids'], { claim_ids => arr(pat('^C-[0-9]{2}$')) }),
  when_type('team',     ['person_ids'], { person_ids => arr(pat('^PER-[0-9]{2}$')) }),
  when_type('cta',      ['primary'], { primary => $link, secondary => $link }),
  when_type('richtext', ['body'], { body => str() }),
  when_type('form',     ['form_id'], { form_id => pat('^CONV-[0-9]{2}$') }),
  when_type('reference-list', ['source'], { source => en(qw(insights capabilities industries)),
    filter => { type => 'object' }, limit => { type => 'integer', minimum => 1, maximum => 12 } }),
]);

# ---- expertise ------------------------------------------------------------
entity('capability', 'Capability (Expertise component)', [qw(id name slug summary has_detail_page original_source provenance)], {
  id => pat('^CAP-[0-9]{2}$'),
  name => str(), slug => ref_('slug'), summary => str(),
  aliases => arr(str(), description => 'Brief capability names (08 §4); metadata and search synonyms only'),
  has_detail_page => { type => 'boolean', default => JSON::PP::false },
  challenges => rels(), outcome_themes => rels(), engagement_types => arr(pat('^ENG-[0-9]{2}$')),
  related_industries => rels(), related_insights => rels(), related_capabilities => rels(),
  original_source => str(),
});
entity('engagement-type', 'Engagement type', [qw(id name body order entry_point provenance)], {
  id => pat('^ENG-[0-9]{2}$'), name => str(), body => str(), order => { type => 'integer' },
  entry_point => { type => 'boolean' }, typical_duration => str(description => 'From source only'),
  capabilities => arr(pat('^CAP-[0-9]{2}$')),
});
entity('challenge', 'Challenge', [qw(id title body provenance)], {
  id => pat('^CHL-[0-9]{2}$'), title => str(), body => str(), icon_key => str(), capabilities => rels(),
});
entity('industry', 'Industry', [qw(id name slug evidence_level verified_experience has_detail_page provenance)], {
  id => pat('^IND-[0-9]{2}$'), name => str(), slug => ref_('slug'),
  evidence_level => en(qw(evidenced selected-experience)),
  approved_description => str(),
  verified_experience => arr(pat('^TT-INS-[0-9]{3}$')),
  operating_considerations => arr(str()),
  related_capabilities => rels(), related_resources => arr(str()),
  has_detail_page => { type => 'boolean' },
}, allOf => [ { if => { properties => { evidence_level => { const => 'evidenced' } } },
               then => { properties => { verified_experience => { minItems => 2 } } } },
              { if => { properties => { evidence_level => { const => 'selected-experience' } } },
               then => { properties => { has_detail_page => { const => JSON::PP::false } } } } ]);

# ---- insights -------------------------------------------------------------
entity('insight', 'Insight (perspective, case study, guide, whitepaper)',
  [qw(id slug listing_title h1 excerpt content_type legacy_category author_id published_at body seo legacy_source status provenance)], {
  id => pat('^TT-INS-[0-9]{3}$'), slug => ref_('slug'),
  listing_title => str(description => 'Sheet title: card and SEO title (D-09)'),
  h1 => str(description => 'Doc headline: page H1 (D-09)'),
  excerpt => str(), subtitle => str(),
  content_type => en(qw(perspective case-study guide whitepaper)),
  legacy_category => en('Case Study', 'Execution', 'Transformation'),
  topics => arr(str(), maxItems => 3), source_tags => str(),
  capabilities => rels(maxItems => 2), industries => rels(maxItems => 1),
  outcome_themes => arr(pat('^OUT-[0-9]{2}$')),
  author_id => pat('^PER-[0-9]{2}$'),
  attribution_note => str(description => 'D-04'),
  published_at => $date, updated_at => $date,
  read_time_minutes => { type => 'integer', minimum => 1 },
  body => arr({ '$ref' => 'block.schema.json' }),
  cover => pat('^TT-AS-[0-9]{3}$'), attachments => arr(pat('^TT-AS-[0-9]{3}$')),
  claim_ids => arr(pat('^C-[0-9]{2}$')),
  related => rels(maxItems => 3),
  seo => ref_('seo'),
  legacy_source => { type => 'object', required => ['doc_id'],
    properties => { doc_id => str(), sheet_id => str(), sheet_row => { type => 'integer' } } },
  status => en(qw(draft published retired)),
});

# ---- people, outcomes, evidence ------------------------------------------
entity('person', 'Person', [qw(id name approved_title biography show_on_about publication_approval provenance)], {
  id => pat('^PER-[0-9]{2}$'), name => str(), slug => ref_('slug'),
  approved_title => str(), biography => str(),
  credentials => arr(pat('^C-[0-9]{2}$')),
  headshot => pat('^TT-AS-[0-9]{3}$'), linkedin_url => str(format => 'uri'),
  capabilities => rels(), is_author => { type => 'boolean' }, show_on_about => { type => 'boolean' },
  publication_approval => $approval,
});
entity('outcome-theme', 'Outcome theme', [qw(id name provenance)], {
  id => pat('^OUT-[0-9]{2}$'),
  name => en('Better Decisions', 'Improved Performance', 'Efficient Operations', 'Sustainable Transformation'),
  description => str(description => 'New content (N-02)'),
  capabilities => arr(pat('^CAP-[0-9]{2}$')), supporting_proof => arr(str()),
});
entity('claim', 'Claim / evidence', [qw(claim_id value label source_block_ids attribution verification_status)], {
  claim_id => pat('^C-[0-9]{2}$'), value => str(), label => str(),
  source_block_ids => arr(str()), substantiated_by => pat('^TT-INS-[0-9]{3}$'),
  attribution => en(qw(tech-transpire founder-prior-experience individual)),
  verification_status => { enum => [qw(unverified verified rejected)], description => 'Only verified claims may render' },
  verified_by => str(), verified_at => $date, evidence_note => str(),
}, no_provenance => 1);
entity('testimonial', 'Testimonial / client story consent', [qw(id source consent_status client_attribution provenance)], {
  id => str(), source => str(),
  consent_status => { enum => [qw(none requested granted withdrawn)], description => 'Renders only when granted' },
  consent_record => str(), client_attribution => en(qw(named anonymised role-only)),
  approved_wording => str(), publication_approval => $approval,
  capabilities => arr(str()), industries => arr(str()), outcome_evidence => arr(pat('^C-[0-9]{2}$')),
});
entity('asset', 'Asset', [qw(asset_id file_type original_url usage_rights migration_status provenance)], {
  asset_id => pat('^TT-AS-[0-9]{3}$'), original_filename => str(), file_type => str(),
  original_url => str(), archived_copy => str(),
  usage_rights => en(qw(owned licensed unconfirmed)),
  alt_text => str(), alt_text_source => en(qw(none new-pending new-approved)),
  decorative => { type => 'boolean' }, related_pages => arr(str()),
  migration_status => en(qw(pending migrated replaced retired)),
});

# ---- navigation, settings, conversion, redirects --------------------------
entity('navigation-item', 'Navigation item', [qw(id menu label target order)], {
  id => str(), menu => en(qw(primary footer utility)), label => str(), target => str(),
  order => { type => 'integer' }, children => arr({ '$ref' => 'navigation-item.schema.json' }),
  visible_from => $date,
}, no_provenance => 1);
entity('site-settings', 'Site settings / business configuration', [qw(site_name email canonical_host)], {
  site_name => { const => 'Tech Transpire' }, tagline => str(), legal_entity_line => str(),
  email => str(format => 'email'), phone_display => str(), phone_e164 => pat('^\+[1-9][0-9]{6,14}$'),
  linkedin_url => str(format => 'uri'), booking_url => str(format => 'uri'),
  response_promise => str(), default_seo => ref_('seo'),
  analytics => { type => 'object', properties => { provider => str(), property_id => str(),
    consent_mode => en(qw(none-required opt-in opt-out)) } },
  canonical_host => str(format => 'uri'),
});
entity('conversion-action', 'Conversion action / form', [qw(id name type tracking_event)], {
  id => pat('^CONV-[0-9]{2}$'), name => str(),
  type => en(qw(booking-link form email phone)),
  audience => arr(str()), motivation => str(),
  fields => $items->([qw(name label type required)], name => str(), label => str(),
    type => en(qw(text email tel select textarea checkbox)), required => { type => 'boolean' },
    options => arr({ type => 'object', properties => { value => str(), label => str() } }),
    validation => str(), max_length => { type => 'integer' },
    crm_field => str(description => 'Zoho CRM API field name, e.g. Last_Name')),
  area_of_interest_options => $items->([qw(value label)], value => str(), label => str(),
    basis_block => str(description => 'Source block the option derives from, e.g. TT-PG-002-B04'),
    crm_value => str(description => 'Zoho picklist value')),
  consent => { type => 'object', properties => { text => str(), privacy_policy_ref => str(), required => { type => 'boolean' } } },
  destinations => $items->([qw(role kind target)],
    role => en(qw(primary notification fallback)),
    kind => en(qw(zoho-crm email webhook)), target => str(description => 'Module or address; never a secret')),
  states => { type => 'object', required => [qw(success_message error_message)],
    properties => { success_message => str(description => 'Shown only on confirmed delivery (T8)'),
      error_message => str(), validation_messages => { type => 'object' } } },
  spam_protection => arr(en(qw(honeypot min-submit-time rate-limit challenge))),
  tracking_event => { type => 'object', required => ['name'],
    properties => { name => str(), parameters => arr(str(), description => 'Never personal data') } },
});
entity('redirect', 'Redirect', [qw(from to status reason)], {
  from => pat('^/'), to => str(), status => en(301, 308, 410), reason => str(),
  source_ref => str(), verified_at => $date,
}, no_provenance => 1);

opendir(my $dh, $dir) or die $!;
my @f = grep { /\.json$/ } readdir($dh);
print scalar(@f), " schema files written\n";
