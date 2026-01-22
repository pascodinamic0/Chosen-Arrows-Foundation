-- Seed initial site settings
-- Run this after the main seed script

INSERT INTO site_settings (setting_key, setting_value, description)
VALUES
  ('contact_info', '{
    "email": "ChosenArrowsFoundation@gmail.com",
    "phone": "+254-XXX-XXXXXX",
    "address": "Nairobi, Kenya"
  }'::jsonb, 'Contact information displayed in footer'),
  ('social_links', '{
    "facebook": "https://facebook.com/chosenarrowsfoundation",
    "twitter": "https://twitter.com/chosenarrows",
    "instagram": "https://instagram.com/chosenarrows",
    "linkedin": "https://linkedin.com/company/chosen-arrows-foundation"
  }'::jsonb, 'Social media links for footer'),
  ('hero_stats', '{
    "childrenSupported": 45,
    "activeMentors": 8,
    "fundsRaised": 15000
  }'::jsonb, 'Hero section statistics')
ON CONFLICT (setting_key) DO UPDATE SET
  setting_value = EXCLUDED.setting_value,
  description = EXCLUDED.description,
  updated_at = NOW();