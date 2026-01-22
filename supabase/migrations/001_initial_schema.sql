-- Chosen Arrows Foundation CMS - Initial Database Schema
-- Migration: 001_initial_schema
-- Description: Creates all core tables, indexes, functions, and RLS policies

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Content Sections
CREATE TABLE content_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key VARCHAR(100) UNIQUE NOT NULL,
  content_type VARCHAR(50) NOT NULL DEFAULT 'json',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_content_sections_key ON content_sections(section_key);

-- Content Translations
CREATE TABLE content_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES content_sections(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(section_id, language_code)
);

CREATE INDEX idx_content_translations_section ON content_translations(section_id);
CREATE INDEX idx_content_translations_lang ON content_translations(language_code);

-- Campaigns
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  goal_amount DECIMAL(10, 2) NOT NULL,
  raised_amount DECIMAL(10, 2) DEFAULT 0,
  donor_count INTEGER DEFAULT 0,
  days_left INTEGER,
  category VARCHAR(50),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_featured ON campaigns(featured);
CREATE INDEX idx_campaigns_slug ON campaigns(slug);

-- Campaign Translations
CREATE TABLE campaign_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL,
  title VARCHAR(255) NOT NULL,
  story TEXT NOT NULL,
  full_story TEXT,
  child_name VARCHAR(100),
  child_age INTEGER,
  location VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, language_code)
);

CREATE INDEX idx_campaign_translations_campaign ON campaign_translations(campaign_id);

-- Campaign Images
CREATE TABLE campaign_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_alt TEXT,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_campaign_images_campaign ON campaign_images(campaign_id);

-- Campaign Updates
CREATE TABLE campaign_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  update_date DATE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_campaign_updates_campaign ON campaign_updates(campaign_id);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  avatar_initials VARCHAR(10),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_testimonials_active ON testimonials(is_active);

-- Site Settings
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_site_settings_key ON site_settings(setting_key);

-- Admin Users
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'editor',
  full_name VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

CREATE INDEX idx_admin_users_role ON admin_users(role);

-- Content Audit Log
CREATE TABLE content_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name VARCHAR(100) NOT NULL,
  record_id UUID NOT NULL,
  action VARCHAR(20) NOT NULL,
  old_values JSONB,
  new_values JSONB,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_table_record ON content_audit_log(table_name, record_id);
CREATE INDEX idx_audit_log_user ON content_audit_log(user_id);
CREATE INDEX idx_audit_log_created ON content_audit_log(created_at);

-- Page Metadata
CREATE TABLE page_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path VARCHAR(255) NOT NULL,
  language_code VARCHAR(10) NOT NULL DEFAULT 'en',
  title VARCHAR(255),
  description TEXT,
  keywords TEXT[],
  og_title VARCHAR(255),
  og_description TEXT,
  og_image_url TEXT,
  og_type VARCHAR(50) DEFAULT 'website',
  twitter_card VARCHAR(50) DEFAULT 'summary_large_image',
  twitter_title VARCHAR(255),
  twitter_description TEXT,
  twitter_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(page_path, language_code)
);

CREATE INDEX idx_page_metadata_path ON page_metadata(page_path);
CREATE INDEX idx_page_metadata_lang ON page_metadata(language_code);

-- Static Image Mapping
CREATE TABLE static_image_mapping (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_path VARCHAR(255) UNIQUE NOT NULL,
  storage_path TEXT NOT NULL,
  storage_url TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_static_image_mapping_path ON static_image_mapping(original_path);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Admin user check function (optimized for RLS)
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.role IN ('super_admin', 'admin', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Audit log trigger function
CREATE OR REPLACE FUNCTION log_content_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO content_audit_log (table_name, record_id, action, new_values, user_id)
    VALUES (TG_TABLE_NAME, NEW.id, 'create', row_to_json(NEW), auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO content_audit_log (table_name, record_id, action, old_values, new_values, user_id)
    VALUES (TG_TABLE_NAME, NEW.id, 'update', row_to_json(OLD), row_to_json(NEW), auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO content_audit_log (table_name, record_id, action, old_values, user_id)
    VALUES (TG_TABLE_NAME, OLD.id, 'delete', row_to_json(OLD), auth.uid());
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Update timestamp triggers
CREATE TRIGGER update_content_sections_updated_at
  BEFORE UPDATE ON content_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_translations_updated_at
  BEFORE UPDATE ON content_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaign_translations_updated_at
  BEFORE UPDATE ON campaign_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_metadata_updated_at
  BEFORE UPDATE ON page_metadata
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Audit log triggers
CREATE TRIGGER audit_content_sections
  AFTER INSERT OR UPDATE OR DELETE ON content_sections
  FOR EACH ROW
  EXECUTE FUNCTION log_content_changes();

CREATE TRIGGER audit_content_translations
  AFTER INSERT OR UPDATE OR DELETE ON content_translations
  FOR EACH ROW
  EXECUTE FUNCTION log_content_changes();

CREATE TRIGGER audit_campaigns
  AFTER INSERT OR UPDATE OR DELETE ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION log_content_changes();

CREATE TRIGGER audit_campaign_translations
  AFTER INSERT OR UPDATE OR DELETE ON campaign_translations
  FOR EACH ROW
  EXECUTE FUNCTION log_content_changes();

CREATE TRIGGER audit_testimonials
  AFTER INSERT OR UPDATE OR DELETE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION log_content_changes();

CREATE TRIGGER audit_site_settings
  AFTER INSERT OR UPDATE OR DELETE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION log_content_changes();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE static_image_mapping ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read content_sections"
  ON content_sections FOR SELECT
  USING (true);

CREATE POLICY "Public can read content_translations"
  ON content_translations FOR SELECT
  USING (true);

CREATE POLICY "Public can read active campaigns"
  ON campaigns FOR SELECT
  USING (status = 'active' OR status = 'completed');

CREATE POLICY "Public can read campaign_translations"
  ON campaign_translations FOR SELECT
  USING (true);

CREATE POLICY "Public can read campaign_images"
  ON campaign_images FOR SELECT
  USING (true);

CREATE POLICY "Public can read campaign_updates"
  ON campaign_updates FOR SELECT
  USING (true);

CREATE POLICY "Public can read active testimonials"
  ON testimonials FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read site_settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Public can read page_metadata"
  ON page_metadata FOR SELECT
  USING (true);

CREATE POLICY "Public can read static_image_mapping"
  ON static_image_mapping FOR SELECT
  USING (true);

-- Admin write policies
CREATE POLICY "Admins can manage content_sections"
  ON content_sections FOR ALL
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

CREATE POLICY "Admins can manage content_translations"
  ON content_translations FOR ALL
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

CREATE POLICY "Admins can manage campaigns"
  ON campaigns FOR ALL
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

CREATE POLICY "Admins can manage campaign_translations"
  ON campaign_translations FOR ALL
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

CREATE POLICY "Admins can manage campaign_images"
  ON campaign_images FOR ALL
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

CREATE POLICY "Admins can manage campaign_updates"
  ON campaign_updates FOR ALL
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

CREATE POLICY "Admins can manage testimonials"
  ON testimonials FOR ALL
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

CREATE POLICY "Admins can manage site_settings"
  ON site_settings FOR ALL
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

CREATE POLICY "Admins can manage page_metadata"
  ON page_metadata FOR ALL
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- Admin users can read their own record and other admin records (for middleware checks)
CREATE POLICY "Users can read own admin record"
  ON admin_users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can read admin_users"
  ON admin_users FOR SELECT
  USING (is_admin_user());

-- Super admins can manage admin users
CREATE POLICY "Super admins can manage admin_users"
  ON admin_users FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'super_admin'
    )
  );

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE content_sections IS 'Stores all editable content sections from the website';
COMMENT ON TABLE content_translations IS 'Multi-language content storage';
COMMENT ON TABLE campaigns IS 'Campaign management';
COMMENT ON TABLE campaign_translations IS 'Multi-language campaign content';
COMMENT ON TABLE campaign_images IS 'Campaign image associations';
COMMENT ON TABLE campaign_updates IS 'Campaign progress updates';
COMMENT ON TABLE testimonials IS 'Community testimonials';
COMMENT ON TABLE site_settings IS 'Global site settings and metadata';
COMMENT ON TABLE admin_users IS 'Admin user management (extends Supabase auth.users)';
COMMENT ON TABLE content_audit_log IS 'Audit trail for content changes';
COMMENT ON TABLE page_metadata IS 'Per-page SEO metadata management';
COMMENT ON TABLE static_image_mapping IS 'Mapping table for migrating static image imports to Supabase Storage';
