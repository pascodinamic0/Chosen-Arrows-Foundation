-- Seed initial content sections, translations, and sample campaigns.
-- Safe to re-run (uses upserts).

-- =============================================================================
-- Content Sections + Translations
-- =============================================================================

WITH section AS (
  INSERT INTO content_sections (section_key, content_type)
  VALUES ('hero', 'json')
  ON CONFLICT (section_key) DO UPDATE SET updated_at = NOW()
  RETURNING id
)
INSERT INTO content_translations (section_id, language_code, content)
VALUES (
  (SELECT id FROM section),
  'en',
  '{
    "badge": "Empowering Children, Shaping Destinies",
    "title": "Every Child is an Arrow in the Hand of God",
    "subtitle": "We guide children toward their ordained destinies through mentorship, education, and transparent support — planting seeds of hope that will light up the world.",
    "cta": "Start Giving Hope",
    "ctaMentor": "Become a Mentor",
    "stats": {
      "childrenSupported": 45,
      "activeMentors": 8,
      "fundsRaised": 15000
    }
  }'::jsonb
)
ON CONFLICT (section_id, language_code) DO UPDATE
SET content = EXCLUDED.content,
    updated_at = NOW();

WITH section AS (
  INSERT INTO content_sections (section_key, content_type)
  VALUES ('values', 'json')
  ON CONFLICT (section_key) DO UPDATE SET updated_at = NOW()
  RETURNING id
)
INSERT INTO content_translations (section_id, language_code, content)
VALUES (
  (SELECT id FROM section),
  'en',
  '{
    "title": "Our Core Values",
    "subtitle": "R.I.T.A.H + Community",
    "description": "Guiding principles that shape everything we do and every life we touch",
    "values": [
      { "key": "responsibility", "title": "Responsibility", "description": "We care for every child entrusted to us with compassion and accountability." },
      { "key": "integrity", "title": "Integrity", "description": "We uphold honesty and transparency in every action and partnership." },
      { "key": "trust", "title": "Trust", "description": "We build dependable relationships rooted in love and consistency." },
      { "key": "adeptness", "title": "Adeptness", "description": "We serve with excellence, always learning and growing in purpose." },
      { "key": "honesty", "title": "Honesty", "description": "We speak truth in love — reflecting the nature and light of God." },
      { "key": "community", "title": "Community", "description": "We nurture belonging and connection, building a family of support around every child." }
    ],
    "vision": {
      "title": "Our Vision",
      "quote": "Just like arrows in the hands of a skilled archer, we aim to guide the children God entrusts to us toward the direction of their ordained destinies."
    }
  }'::jsonb
)
ON CONFLICT (section_id, language_code) DO UPDATE
SET content = EXCLUDED.content,
    updated_at = NOW();

WITH section AS (
  INSERT INTO content_sections (section_key, content_type)
  VALUES ('impact', 'json')
  ON CONFLICT (section_key) DO UPDATE SET updated_at = NOW()
  RETURNING id
)
INSERT INTO content_translations (section_id, language_code, content)
VALUES (
  (SELECT id FROM section),
  'en',
  '{
    "title": "Measuring Real Impact",
    "subtitle": "Every number tells a story of transformation, hope, and divine purpose fulfilled",
    "stats": [
      { "value": "45", "label": "Children Supported", "description": "Lives touched and transformed" },
      { "value": "30", "label": "Scholarships Awarded", "description": "Educational dreams fulfilled" },
      { "value": "8", "label": "Active Mentorships", "description": "Guided toward purpose" },
      { "value": "100+", "label": "Donors Worldwide", "description": "Partners in hope" },
      { "value": "95%", "label": "Success Rate", "description": "Reaching milestones" },
      { "value": "1", "label": "Country Served", "description": "Kenya" }
    ],
    "transparency": {
      "title": "Transparency in Every Step",
      "description": "We believe in complete transparency. Every donation is tracked, every milestone is documented, and every success story is shared. You do not just give — you witness the transformation.",
      "features": ["Real-time Updates", "Verified Impact", "Full Accountability"]
    }
  }'::jsonb
)
ON CONFLICT (section_id, language_code) DO UPDATE
SET content = EXCLUDED.content,
    updated_at = NOW();

WITH section AS (
  INSERT INTO content_sections (section_key, content_type)
  VALUES ('community', 'json')
  ON CONFLICT (section_key) DO UPDATE SET updated_at = NOW()
  RETURNING id
)
INSERT INTO content_translations (section_id, language_code, content)
VALUES (
  (SELECT id FROM section),
  'en',
  '{
    "title": "A Community of Hope Builders",
    "subtitle": "Hear from those who believe, give, and witness transformation",
    "imageCaption": "Together, we are shaping the next generation of leaders",
    "stats": {
      "donorRetention": "98%",
      "avgRating": "4.9★",
      "transparency": "100%"
    }
  }'::jsonb
)
ON CONFLICT (section_id, language_code) DO UPDATE
SET content = EXCLUDED.content,
    updated_at = NOW();

WITH section AS (
  INSERT INTO content_sections (section_key, content_type)
  VALUES ('cta', 'json')
  ON CONFLICT (section_key) DO UPDATE SET updated_at = NOW()
  RETURNING id
)
INSERT INTO content_translations (section_id, language_code, content)
VALUES (
  (SELECT id FROM section),
  'en',
  '{
    "title": "Be Part of Something Eternal",
    "subtitle": "Every arrow needs guidance. Every child needs hope. Your support can change a life forever.",
    "mainCta": "Make Your Impact Today",
    "items": [
      { "title": "Give Once or Monthly", "description": "Choose an amount that feels right and watch your impact grow", "action": "Start Giving", "href": "/donate" },
      { "title": "Become a Mentor", "description": "Share your time, wisdom, and experience with a child in need", "action": "Apply to Mentor", "href": "/mentorship" },
      { "title": "Sponsor a Child", "description": "Create a lasting bond and follow their journey toward purpose", "action": "Find Your Arrow", "href": "/donate" }
    ]
  }'::jsonb
)
ON CONFLICT (section_id, language_code) DO UPDATE
SET content = EXCLUDED.content,
    updated_at = NOW();

-- =============================================================================
-- Sample Campaigns
-- =============================================================================

WITH campaign AS (
  INSERT INTO campaigns (
    slug,
    status,
    goal_amount,
    raised_amount,
    donor_count,
    days_left,
    category,
    featured
  )
  VALUES (
    'grace-education',
    'active',
    1500,
    850,
    15,
    25,
    'education',
    true
  )
  ON CONFLICT (slug) DO UPDATE SET
    status = EXCLUDED.status,
    goal_amount = EXCLUDED.goal_amount,
    raised_amount = EXCLUDED.raised_amount,
    donor_count = EXCLUDED.donor_count,
    days_left = EXCLUDED.days_left,
    category = EXCLUDED.category,
    featured = EXCLUDED.featured,
    updated_at = NOW()
  RETURNING id
)
INSERT INTO campaign_translations (
  campaign_id,
  language_code,
  title,
  story,
  full_story,
  child_name,
  child_age,
  location
)
VALUES (
  (SELECT id FROM campaign),
  'en',
  'Grace Educational Journey',
  'Grace dreams of becoming a doctor to help her community. With your support, she can receive the education and mentorship needed to achieve her destiny.',
  NULL,
  'Grace',
  8,
  'Nairobi, Kenya'
)
ON CONFLICT (campaign_id, language_code) DO UPDATE SET
  title = EXCLUDED.title,
  story = EXCLUDED.story,
  full_story = EXCLUDED.full_story,
  child_name = EXCLUDED.child_name,
  child_age = EXCLUDED.child_age,
  location = EXCLUDED.location,
  updated_at = NOW();

WITH campaign AS (
  INSERT INTO campaigns (
    slug,
    status,
    goal_amount,
    raised_amount,
    donor_count,
    days_left,
    category,
    featured
  )
  VALUES (
    'david-hope',
    'active',
    1200,
    580,
    12,
    18,
    'education',
    false
  )
  ON CONFLICT (slug) DO UPDATE SET
    status = EXCLUDED.status,
    goal_amount = EXCLUDED.goal_amount,
    raised_amount = EXCLUDED.raised_amount,
    donor_count = EXCLUDED.donor_count,
    days_left = EXCLUDED.days_left,
    category = EXCLUDED.category,
    featured = EXCLUDED.featured,
    updated_at = NOW()
  RETURNING id
)
INSERT INTO campaign_translations (
  campaign_id,
  language_code,
  title,
  story,
  full_story,
  child_name,
  child_age,
  location
)
VALUES (
  (SELECT id FROM campaign),
  'en',
  'David Hope for Tomorrow',
  'David has a gift for mathematics and science. Help us provide him with the resources and guidance to become the engineer he is meant to be.',
  NULL,
  'David',
  10,
  'Nairobi, Kenya'
)
ON CONFLICT (campaign_id, language_code) DO UPDATE SET
  title = EXCLUDED.title,
  story = EXCLUDED.story,
  full_story = EXCLUDED.full_story,
  child_name = EXCLUDED.child_name,
  child_age = EXCLUDED.child_age,
  location = EXCLUDED.location,
  updated_at = NOW();
