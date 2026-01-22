# Backend Architecture & Admin Dashboard Specification
## Chosen Arrows Foundation CMS

**Version:** 1.1 (Updated with Review Corrections)  
**Date:** 2025-01-27  
**Last Updated:** 2025-01-27  
**Architect:** Senior Full-Stack Architect

---

## Executive Summary

This specification outlines a complete backend architecture and admin dashboard system that enables all frontend content to be managed through a modern admin panel without changing the existing UI, layout, or copy structure. The solution leverages Supabase as the backend, Next.js 14 App Router Server Actions, and a role-based admin interface.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Database Schema](#database-schema)
3. [Content Management System](#content-management-system)
4. [Admin Dashboard Specification](#admin-dashboard-specification)
5. [API & Server Actions](#api--server-actions)
6. [Authentication & Authorization](#authentication--authorization)
7. [Image & Asset Management](#image--asset-management)
8. [Internationalization (i18n) Management](#internationalization-i18n-management)
9. [Implementation Roadmap](#implementation-roadmap)
10. [Migration Strategy](#migration-strategy)

---

## Architecture Overview

### Technology Stack

- **Backend:** Supabase (PostgreSQL + Storage + Auth)
- **Frontend Framework:** Next.js 14 App Router
- **Server Actions:** Next.js Server Actions for data mutations
- **Admin UI:** Next.js App Router with shadcn/ui components
- **Authentication:** Supabase Auth with Row Level Security (RLS)
- **Storage:** Supabase Storage for images/assets
- **Type Safety:** TypeScript with generated types from Supabase

### Architecture Principles

1. **Zero Frontend Changes:** All content is fetched dynamically, but components remain unchanged
2. **Type Safety:** Full TypeScript support with generated database types
3. **Performance:** Server-side rendering with ISR (Incremental Static Regeneration) where appropriate
4. **Security:** Row Level Security (RLS) policies on all tables
5. **Scalability:** Designed to handle multi-language content and future growth

### System Flow

```
┌─────────────────┐
│  Public Website │
│  (Next.js App)  │
└────────┬────────┘
         │
         │ Fetches content via Server Actions
         │
┌────────▼────────┐
│  Server Actions │
│  (Next.js API)  │
└────────┬────────┘
         │
         │ Queries with RLS
         │
┌────────▼────────┐
│   Supabase DB   │
│  (PostgreSQL)    │
└─────────────────┘

┌─────────────────┐
│  Admin Dashboard│
│  (/admin/*)     │
└────────┬────────┘
         │
         │ Authenticated requests
         │
┌────────▼────────┐
│  Server Actions │
│  (with Admin    │
│   permissions)  │
└────────┬────────┘
         │
         │ Direct writes (bypass RLS for admins)
         │
┌────────▼────────┐
│   Supabase DB   │
└─────────────────┘
```

---

## Database Schema

### Core Tables

#### 1. `content_sections`
Stores all editable content sections from the website.

```sql
CREATE TABLE content_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'hero', 'values', 'impact'
  content_type VARCHAR(50) NOT NULL, -- 'text', 'rich_text', 'json', 'number'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_content_sections_key ON content_sections(section_key);
```

**Section Keys:**
- `hero` - Hero section content
- `values` - Values section
- `impact` - Impact statistics
- `community` - Community section
- `cta` - Call-to-action section
- `footer` - Footer content
- `navigation` - Navigation menu items
- `about` - About page content
- `contact` - Contact page content
- `mentorship` - Mentorship page content
- `donate` - Donate page content
- `donate-form` - Donate form specific content (impact messages, preset amounts)
- `not-found` - 404 page content

#### 2. `content_translations`
Multi-language content storage.

```sql
CREATE TABLE content_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES content_sections(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL, -- 'en', 'fr', 'zh'
  content JSONB NOT NULL, -- Flexible JSON structure per section
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(section_id, language_code)
);

-- Indexes
CREATE INDEX idx_content_translations_section ON content_translations(section_id);
CREATE INDEX idx_content_translations_lang ON content_translations(language_code);
```

#### 3. `campaigns`
Campaign management.

```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'active', 'completed', 'archived'
  goal_amount DECIMAL(10, 2) NOT NULL,
  raised_amount DECIMAL(10, 2) DEFAULT 0,
  donor_count INTEGER DEFAULT 0,
  days_left INTEGER,
  category VARCHAR(50), -- 'Education', 'Healthcare', 'Skills'
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_featured ON campaigns(featured);
CREATE INDEX idx_campaigns_slug ON campaigns(slug);
```

#### 4. `campaign_translations`
Multi-language campaign content.

```sql
CREATE TABLE campaign_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL,
  title VARCHAR(255) NOT NULL, -- Campaign title (matches codebase usage)
  story TEXT NOT NULL, -- Short story for list view
  full_story TEXT, -- Full story for detail page
  child_name VARCHAR(100),
  child_age INTEGER,
  location VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, language_code)
);

-- Indexes
CREATE INDEX idx_campaign_translations_campaign ON campaign_translations(campaign_id);
```

**Note:** The `title` field is used instead of `name` to match the existing codebase. The `child` field displayed in the UI is formatted as "Name, Age" from `child_name` and `child_age` fields.

#### 5. `campaign_images`
Campaign image associations.

```sql
CREATE TABLE campaign_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL, -- Supabase Storage URL
  image_alt TEXT,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_campaign_images_campaign ON campaign_images(campaign_id);
```

#### 6. `campaign_updates`
Campaign progress updates.

```sql
CREATE TABLE campaign_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  update_date DATE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_campaign_updates_campaign ON campaign_updates(campaign_id);
```

#### 7. `testimonials`
Community testimonials.

```sql
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

-- Indexes
CREATE INDEX idx_testimonials_active ON testimonials(is_active);
```

#### 8. `site_settings`
Global site settings and metadata.

```sql
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_site_settings_key ON site_settings(setting_key);
```

**Setting Keys:**
- `hero_stats` - Hero section statistics (children supported, mentors, funds raised)
- `impact_stats` - Impact section statistics
- `community_stats` - Community section statistics
- `contact_info` - Contact information (email, phone, address, hours)
- `social_links` - Social media links
- `seo_metadata` - Global SEO settings
- `donate_preset_amounts` - Preset donation amounts (e.g., [25, 50, 100, 250, 500])

#### 9. `admin_users`
Admin user management (extends Supabase auth.users).

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'editor', -- 'super_admin', 'admin', 'editor'
  full_name VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  PRIMARY KEY (id)
);

-- Indexes
CREATE INDEX idx_admin_users_role ON admin_users(role);
```

#### 10. `content_audit_log`
Audit trail for content changes.

```sql
CREATE TABLE content_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name VARCHAR(100) NOT NULL,
  record_id UUID NOT NULL,
  action VARCHAR(20) NOT NULL, -- 'create', 'update', 'delete'
  old_values JSONB,
  new_values JSONB,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audit_log_table_record ON content_audit_log(table_name, record_id);
CREATE INDEX idx_audit_log_user ON content_audit_log(user_id);
CREATE INDEX idx_audit_log_created ON content_audit_log(created_at);
```

#### 11. `page_metadata`
Per-page SEO metadata management.

```sql
CREATE TABLE page_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path VARCHAR(255) NOT NULL, -- '/', '/about', '/campaigns', etc.
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

-- Indexes
CREATE INDEX idx_page_metadata_path ON page_metadata(page_path);
CREATE INDEX idx_page_metadata_lang ON page_metadata(language_code);
```

#### 12. `static_image_mapping`
Mapping table for migrating static image imports to Supabase Storage.

```sql
CREATE TABLE static_image_mapping (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_path VARCHAR(255) UNIQUE NOT NULL, -- e.g., '@/assets/child-1.jpg'
  storage_path TEXT NOT NULL, -- Supabase Storage path
  storage_url TEXT NOT NULL, -- Public URL
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_static_image_mapping_path ON static_image_mapping(original_path);
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access
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

CREATE POLICY "Public can read active testimonials"
  ON testimonials FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read site_settings"
  ON site_settings FOR SELECT
  USING (true);

-- Admin write access (optimized with function for better performance)
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

-- Public read access for page_metadata
CREATE POLICY "Public can read page_metadata"
  ON page_metadata FOR SELECT
  USING (true);
```

**Performance Note:** Using a security definer function (`is_admin_user()`) instead of inline EXISTS subqueries improves query performance. The function is cached and reused across policy checks.
```

### Database Functions

#### Update timestamp trigger

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_content_sections_updated_at
  BEFORE UPDATE ON content_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Similar triggers for other tables...
```

#### Audit log trigger

```sql
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

-- Apply to content tables
CREATE TRIGGER audit_content_sections
  AFTER INSERT OR UPDATE OR DELETE ON content_sections
  FOR EACH ROW
  EXECUTE FUNCTION log_content_changes();
```

---

## Content Management System

### Content Structure Mapping

#### Hero Section (`hero`)
```json
{
  "badge": "Empowering Children, Shaping Destinies",
  "title": "Every Child is an Arrow in the Hand of God",
  "subtitle": "We guide children toward their ordained destinies...",
  "cta": "Start Giving Hope",
  "ctaMentor": "Become a Mentor",
  "stats": {
    "childrenSupported": 45,
    "activeMentors": 8,
    "fundsRaised": 15000
  }
}
```

#### Values Section (`values`)
```json
{
  "title": "Our Core Values",
  "subtitle": "R.I.T.A.H",
  "description": "Guiding principles that shape everything we do...",
  "values": [
    {
      "key": "responsibility",
      "title": "Responsibility",
      "description": "We care for every child..."
    },
    // ... other values
  ],
  "vision": {
    "title": "Our Vision",
    "quote": "Just like arrows in the hands of a skilled archer..."
  }
}
```

#### Impact Section (`impact`)
```json
{
  "title": "Measuring Real Impact",
  "subtitle": "Every number tells a story...",
  "stats": [
    {
      "value": "45",
      "label": "Children Supported",
      "description": "Lives touched and transformed"
    },
    // ... other stats
  ],
  "transparency": {
    "title": "Transparency in Every Step",
    "description": "We believe in complete transparency...",
    "features": ["Real-time Updates", "Verified Impact", "Full Accountability"]
  }
}
```

#### Campaigns
Each campaign has:
- Basic info (goal, raised, donors, days left, category)
- Multi-language translations (title, story, full_story, child info)
- Images (primary + additional)
- Updates (progress updates)

**Note on Campaign IDs:** The codebase currently uses numeric IDs (1, 2, 3), but the database schema uses UUIDs. During migration, create a mapping table or update all campaign references to use UUIDs. The slug field can be used for URL routing instead of numeric IDs.

#### Donate Form Section (`donate-form`)
```json
{
  "impactMessages": [
    "School supplies for 2 children",
    "Weekly meals for 5 children",
    "Medical checkup for 1 child"
  ],
  "presetAmounts": [25, 50, 100, 250, 500],
  "defaultAmount": 50
}
```

#### Navigation Section (`navigation`)
```json
{
  "about": "About",
  "campaigns": "Campaigns",
  "mentorship": "Mentorship",
  "contact": "Contact",
  "donate": "Donate Now"
}
```

#### Page Metadata
Each page can have SEO metadata stored in `page_metadata` table:
- Title, description, keywords
- Open Graph tags (og_title, og_description, og_image)
- Twitter Card tags
- Per-language support

---

## Admin Dashboard Specification

### Dashboard Structure

```
/admin
  ├── /login                    # Admin login page
  ├── /dashboard                # Main dashboard (overview)
  ├── /content
  │   ├── /sections            # Content sections editor
  │   ├── /hero                # Hero section editor
  │   ├── /values              # Values section editor
  │   ├── /impact              # Impact section editor
  │   ├── /community           # Community section editor
  │   └── /pages               # Page content (about, contact, etc.)
  ├── /campaigns
  │   ├── /list                # Campaigns list
  │   ├── /new                 # Create new campaign
  │   └── /[id]                # Edit campaign
  ├── /testimonials            # Testimonials management
  ├── /settings
  │   ├── /general             # General settings
  │   ├── /contact              # Contact information
  │   ├── /seo                  # SEO settings
  │   └── /users                # Admin users management
  ├── /media                    # Media library
  └── /audit                    # Audit log viewer
```

### Dashboard Features

#### 1. Content Sections Editor

**Location:** `/admin/content/sections`

**Features:**
- List all content sections
- Edit section by key
- Multi-language editor with tabs (EN, FR, ZH)
- Live preview
- Save draft / Publish
- Version history

**UI Components:**
- Section selector (dropdown/tabs)
- Language tabs
- Rich text editor (for rich_text content types)
- JSON editor (for JSON content types)
- Number inputs (for number content types)
- Image uploader (for image fields)

#### 2. Campaign Management

**Location:** `/admin/campaigns`

**Features:**
- Campaign list with filters (status, category, featured)
- Create/Edit campaign form
- Multi-language campaign content editor
- Image upload and management
- Progress tracking (raised amount, donors, days left)
- Campaign updates/announcements
- Campaign status management (draft → active → completed)

**Campaign Form Fields:**
- Basic Info: Slug, Status, Category, Goal Amount, Days Left, Featured
- Statistics: Raised Amount, Donor Count
- Images: Primary image + additional images
- Translations: Name, Story, Full Story, Child Name, Child Age, Location (per language)
- Updates: Add/edit campaign updates

#### 3. Testimonials Management

**Location:** `/admin/testimonials`

**Features:**
- List testimonials with drag-and-drop reordering
- Add/Edit/Delete testimonials
- Toggle active/inactive
- Avatar initials generator

#### 4. Site Settings

**Location:** `/admin/settings`

**Features:**
- Hero Stats Editor (children supported, mentors, funds raised)
- Impact Stats Editor
- Community Stats Editor
- Contact Information Editor (email, phone, address, hours)
- Social Media Links
- SEO Metadata (global + per page)

#### 5. Media Library

**Location:** `/admin/media`

**Features:**
- Upload images/files
- Browse uploaded media
- Delete media
- Image optimization/cropping
- Search and filter

#### 6. Audit Log

**Location:** `/admin/audit`

**Features:**
- View all content changes
- Filter by table, user, date range
- View diff (old vs new values)
- Export audit log

### Admin Dashboard UI/UX

**Design Principles:**
- Clean, modern interface using shadcn/ui components
- Consistent with public site design language
- Responsive (mobile-friendly)
- Fast loading with optimistic updates
- Clear navigation and breadcrumbs
- Confirmation dialogs for destructive actions
- Toast notifications for success/error states

**Key Components:**
- Sidebar navigation
- Top bar (user menu, notifications)
- Data tables with sorting/filtering
- Form components (inputs, textareas, selects, file uploads)
- Rich text editor (Tiptap or similar)
- Image uploader with preview
- Language switcher for multi-language editing
- Save/Publish buttons with loading states

---

## API & Server Actions

### Server Actions Structure

```
/app
  /actions
    ├── content/
    │   ├── get-content.ts          # Get content by section key + language
    │   ├── update-content.ts        # Update content section
    │   └── get-all-sections.ts     # Get all sections (admin)
    ├── campaigns/
    │   ├── get-campaigns.ts         # Get campaigns (public)
    │   ├── get-campaign.ts          # Get single campaign
    │   ├── create-campaign.ts      # Create campaign (admin)
    │   ├── update-campaign.ts      # Update campaign (admin)
    │   └── delete-campaign.ts      # Delete campaign (admin)
    ├── testimonials/
    │   ├── get-testimonials.ts     # Get testimonials (public)
    │   ├── create-testimonial.ts   # Create (admin)
    │   ├── update-testimonial.ts   # Update (admin)
    │   └── reorder-testimonials.ts # Reorder (admin)
    ├── settings/
    │   ├── get-settings.ts         # Get settings (public)
    │   └── update-settings.ts      # Update settings (admin)
    ├── metadata/
    │   ├── get-page-metadata.ts    # Get page metadata (public)
    │   └── update-page-metadata.ts # Update page metadata (admin)
    ├── media/
    │   ├── upload-image.ts         # Upload image (admin)
    │   ├── delete-image.ts         # Delete image (admin)
    │   └── get-image-url.ts        # Get image URL from mapping (public)
    └── auth/
        ├── admin-login.ts          # Admin login
        └── check-admin-auth.ts     # Check admin auth
```

### Example Server Actions

#### Get Content

```typescript
// app/actions/content/get-content.ts
'use server'

import { createClient } from '@/lib/supabase/server'

export async function getContent(
  sectionKey: string,
  language: string = 'en'
) {
  const supabase = createClient()
  
  // First get the section
  const { data: section, error: sectionError } = await supabase
    .from('content_sections')
    .select('id')
    .eq('section_key', sectionKey)
    .single()
  
  if (sectionError || !section) {
    return null
  }
  
  // Then get the translation for requested language
  const { data: translation, error: translationError } = await supabase
    .from('content_translations')
    .select('content')
    .eq('section_id', section.id)
    .eq('language_code', language)
    .single()
  
  if (translationError || !translation) {
    // Fallback to default language (en) if translation not found
    if (language !== 'en') {
      const { data: defaultTranslation } = await supabase
        .from('content_translations')
        .select('content')
        .eq('section_id', section.id)
        .eq('language_code', 'en')
        .single()
      
      return defaultTranslation?.content || null
    }
    return null
  }
  
  return translation.content
}
```

#### Get Page Metadata

```typescript
// app/actions/metadata/get-page-metadata.ts
'use server'

import { createClient } from '@/lib/supabase/server'

export async function getPageMetadata(
  pagePath: string,
  language: string = 'en'
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('page_metadata')
    .select('*')
    .eq('page_path', pagePath)
    .eq('language_code', language)
    .single()
  
  if (error || !data) {
    // Fallback to English if translation not found
    if (language !== 'en') {
      const { data: defaultData } = await supabase
        .from('page_metadata')
        .select('*')
        .eq('page_path', pagePath)
        .eq('language_code', 'en')
        .single()
      
      return defaultData
    }
    return null
  }
  
  return data
}
```

#### Update Content

```typescript
// app/actions/content/update-content.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'

export async function updateContent(
  sectionKey: string,
  language: string,
  content: Record<string, any>
) {
  // Check admin authentication
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }
  
  const supabase = createClient()
  
  // Get or create section
  let { data: section } = await supabase
    .from('content_sections')
    .select('id')
    .eq('section_key', sectionKey)
    .single()
  
  if (!section) {
    const { data: newSection, error } = await supabase
      .from('content_sections')
      .insert({
        section_key: sectionKey,
        content_type: 'json',
        created_by: user.id
      })
      .select('id')
      .single()
    
    if (error) return { success: false, error: error.message }
    section = newSection
  }
  
  // Upsert translation
  const { error } = await supabase
    .from('content_translations')
    .upsert({
      section_id: section.id,
      language_code: language,
      content,
      updated_by: user.id
    })
  
  if (error) return { success: false, error: error.message }
  
  return { success: true }
}
```

#### Update Page Metadata

```typescript
// app/actions/metadata/update-page-metadata.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'
import { revalidatePath } from 'next/cache'

export async function updatePageMetadata(
  pagePath: string,
  language: string,
  metadata: {
    title?: string
    description?: string
    keywords?: string[]
    og_title?: string
    og_description?: string
    og_image_url?: string
    twitter_card?: string
    twitter_title?: string
    twitter_description?: string
    twitter_image_url?: string
  }
) {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }
  
  const supabase = createClient()
  
  const { error } = await supabase
    .from('page_metadata')
    .upsert({
      page_path: pagePath,
      language_code: language,
      ...metadata,
      updated_by: user.id
    })
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  // Revalidate the page
  revalidatePath(pagePath)
  
  return { success: true }
}
```

#### Get Campaigns

```typescript
// app/actions/campaigns/get-campaigns.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

export async function getCampaigns(
  language: string = 'en',
  options?: {
    featured?: boolean
    limit?: number
  }
) {
  const supabase = createClient()
  
  // Build base query
  let query = supabase
    .from('campaigns')
    .select(`
      *,
      translations:campaign_translations!inner(
        title,
        story,
        full_story,
        child_name,
        child_age,
        location
      ),
      images:campaign_images(
        image_url,
        image_alt,
        is_primary,
        display_order
      )
    `)
    .eq('status', 'active')
    .eq('campaign_translations.language_code', language)
  
  if (options?.featured) {
    query = query.eq('featured', true)
  }
  
  if (options?.limit) {
    query = query.limit(options.limit)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching campaigns:', error)
    throw error
  }
  
  // Transform data to match component expectations
  return data?.map(campaign => {
    const translation = campaign.translations?.[0]
    const primaryImage = campaign.images?.find(img => img.is_primary)?.image_url
    
    return {
      id: campaign.id,
      slug: campaign.slug,
      title: translation?.title || '',
      child: translation?.child_name && translation?.child_age 
        ? `${translation.child_name}, ${translation.child_age}`
        : translation?.child_name || '',
      story: translation?.story || '',
      fullStory: translation?.full_story || '',
      image: primaryImage || campaign.images?.[0]?.image_url || null,
      raised: Number(campaign.raised_amount) || 0,
      goal: Number(campaign.goal_amount) || 0,
      supporters: campaign.donor_count || 0,
      daysLeft: campaign.days_left,
      category: campaign.category || '',
      images: campaign.images?.sort((a, b) => a.display_order - b.display_order) || []
    }
  }) || []
}
```

**Note:** The `title` field is used (not `name`) to match the existing codebase. The `child` field is formatted as "Name, Age" from `child_name` and `child_age`.

---

## Authentication & Authorization

### Admin Authentication Flow

1. Admin visits `/admin/login`
2. Enters email/password
3. Server Action authenticates via Supabase Auth
4. Checks if user exists in `admin_users` table
5. Sets session cookie
6. Redirects to `/admin/dashboard`

### Authorization Levels

- **Super Admin:** Full access, can manage admin users
- **Admin:** Full content management access
- **Editor:** Can edit content but cannot manage users or delete critical content

### Session Management

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Handle error
          }
        },
      },
    }
  )
}
```

### Admin Route Protection

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // Check if user is admin
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role')
      .eq('id', user.id)
      .single()
    
    if (!adminUser) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
```

**Note:** This implementation correctly handles cookies in Next.js 14 App Router middleware using `@supabase/ssr` package.

---

## Image & Asset Management

### Supabase Storage Structure

```
storage/
  ├── campaigns/
  │   ├── {campaign_id}/
  │   │   ├── primary.jpg
  │   │   ├── image-1.jpg
  │   │   └── image-2.jpg
  ├── content/
  │   ├── hero-background.jpg
  │   ├── community.jpg
  │   ├── child-1.jpg
  │   ├── child-2.jpg
  │   ├── logo.jpg
  │   └── ...
  └── testimonials/
      └── {testimonial_id}.jpg
```

### Image Migration Strategy

**Current State:** Components use static imports:
```typescript
import childImage1 from "@/assets/child-1.jpg"
import heroBackground from "@/assets/hero-background.jpg"
```

**Migration Steps:**

1. **Upload Static Images to Supabase Storage**
   - Upload all images from `/src/assets/` to Supabase Storage bucket `images`
   - Maintain folder structure: `content/hero-background.jpg`, `content/child-1.jpg`, etc.

2. **Create Image Mapping Records**
   ```typescript
   // Migration script creates records in static_image_mapping
   {
     original_path: '@/assets/child-1.jpg',
     storage_path: 'content/child-1.jpg',
     storage_url: 'https://[project].supabase.co/storage/v1/object/public/images/content/child-1.jpg',
     alt_text: 'Child photo 1'
   }
   ```

3. **Update Components to Use Dynamic URLs**
   ```typescript
   // Before (static import)
   import childImage1 from "@/assets/child-1.jpg"
   
   // After (dynamic fetch)
   const imageUrl = await getImageUrl('@/assets/child-1.jpg')
   ```

4. **Next.js Image Configuration**
   ```typescript
   // next.config.mjs
   const nextConfig = {
     images: {
       remotePatterns: [
         {
           protocol: 'https',
           hostname: '[project].supabase.co',
           pathname: '/storage/v1/object/public/images/**',
         },
       ],
     },
   }
   ```

5. **Helper Function for Image URLs**
   ```typescript
   // lib/images.ts
   import { createClient } from '@/lib/supabase/server'
   
   export async function getImageUrl(originalPath: string): Promise<string | null> {
     const supabase = createClient()
     const { data } = await supabase
       .from('static_image_mapping')
       .select('storage_url')
       .eq('original_path', originalPath)
       .single()
     
     return data?.storage_url || null
   }
   ```

### Image Upload Server Action

```typescript
// app/actions/media/upload-image.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'

export async function uploadImage(
  file: File,
  folder: string,
  fileName?: string
) {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }
  
  const supabase = createClient()
  const finalFileName = fileName || `${Date.now()}-${file.name}`
  const filePath = `${folder}/${finalFileName}`
  
  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) return { success: false, error: error.message }
  
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath)
  
  return { success: true, url: publicUrl, path: filePath }
}
```

---

## Internationalization (i18n) Management

### Content Translation Strategy

1. **Default Language:** English (en) is the default
2. **Translation Workflow:**
   - Admin edits content in default language
   - Translation interface shows all languages side-by-side
   - Admin can copy from default language to other languages
   - Missing translations fall back to default language

### Translation Editor UI

- Tab-based interface for each language
- Side-by-side comparison view
- "Copy from English" button for each field
- Translation status indicators (complete/incomplete)
- Bulk translation tools

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Set up Supabase project
- [ ] Create database schema
- [ ] Set up RLS policies
- [ ] Create Supabase client utilities
- [ ] Set up admin authentication
- [ ] Create basic admin layout

### Phase 2: Content Management (Week 3-4)
- [ ] Build content sections editor
- [ ] Create Server Actions for content CRUD
- [ ] Update frontend components to fetch from DB
- [ ] Implement multi-language support
- [ ] Add image upload functionality

### Phase 3: Campaign Management (Week 5-6)
- [ ] Build campaigns CRUD interface
- [ ] Create campaign Server Actions
- [ ] Update campaign components to use DB
- [ ] Add campaign image management
- [ ] Implement campaign updates feature

### Phase 4: Additional Features (Week 7-8)
- [ ] Testimonials management
- [ ] Site settings editor
- [ ] Media library
- [ ] Audit log viewer
- [ ] SEO management

### Phase 5: Polish & Testing (Week 9-10)
- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation
- [ ] User training

---

## Migration Strategy

### Data Migration Plan

1. **Export Current Content:**
   - Extract all hardcoded content from components
   - Export i18n JSON files
   - Document all campaign data
   - List all images/assets

2. **Import to Database:**
   - Create migration scripts to import content
   - Map existing i18n structure to database
   - Upload images to Supabase Storage
   - Create initial admin user

3. **Gradual Rollout:**
   - Deploy admin dashboard (behind auth)
   - Update components one-by-one to use DB
   - Test each section thoroughly
   - Keep old code as fallback initially

4. **Cutover:**
   - Switch all components to DB
   - Remove hardcoded content
   - Monitor for issues
   - Rollback plan ready

### Migration Scripts

#### Content Migration

```typescript
// scripts/migrate-content.ts
// Script to migrate existing i18n JSON to database

import { createClient } from '@supabase/supabase-js'
import enContent from '@/src/i18n/locales/en.json'
import frContent from '@/src/i18n/locales/fr.json'
import zhContent from '@/src/i18n/locales/zh.json'

async function migrateContent() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  // Migrate each section (including new sections)
  const sections = [
    'hero', 'values', 'impact', 'community', 'cta', 'footer',
    'navigation', 'about', 'contact', 'mentorship', 'donate', 
    'donate-form', 'not-found'
  ]
  
  for (const section of sections) {
    // Skip if section doesn't exist in JSON
    if (!enContent[section]) {
      console.log(`Skipping ${section} - not found in JSON`)
      continue
    }
    
    // Create section
    const { data: sectionData, error: sectionError } = await supabase
      .from('content_sections')
      .insert({
        section_key: section,
        content_type: 'json'
      })
      .select()
      .single()
    
    if (sectionError) {
      console.error(`Error creating section ${section}:`, sectionError)
      continue
    }
    
    // Insert translations
    const translations = []
    if (enContent[section]) {
      translations.push({
        section_id: sectionData.id,
        language_code: 'en',
        content: enContent[section]
      })
    }
    if (frContent[section]) {
      translations.push({
        section_id: sectionData.id,
        language_code: 'fr',
        content: frContent[section]
      })
    }
    if (zhContent[section]) {
      translations.push({
        section_id: sectionData.id,
        language_code: 'zh',
        content: zhContent[section]
      })
    }
    
    if (translations.length > 0) {
      const { error: transError } = await supabase
        .from('content_translations')
        .insert(translations)
      
      if (transError) {
        console.error(`Error inserting translations for ${section}:`, transError)
      } else {
        console.log(`✓ Migrated ${section}`)
      }
    }
  }
}

migrateContent().catch(console.error)
```

#### Campaign Migration

```typescript
// scripts/migrate-campaigns.ts
// Script to migrate hardcoded campaigns to database

import { createClient } from '@supabase/supabase-js'

// Current hardcoded campaigns from codebase
const hardcodedCampaigns = [
  {
    id: 1,
    title: "Education for Hope",
    child: "Sarah, 12",
    story: "Sarah dreams of becoming a doctor...",
    fullStory: "Sarah is a bright and ambitious...",
    goal: 1500,
    raised: 850,
    supporters: 15,
    daysLeft: 25,
    category: "Education"
  },
  // ... other campaigns
]

async function migrateCampaigns() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  for (const campaign of hardcodedCampaigns) {
    // Parse child name and age
    const [childName, childAgeStr] = campaign.child.split(', ')
    const childAge = parseInt(childAgeStr) || null
    
    // Generate slug from title
    const slug = campaign.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    
    // Create campaign
    const { data: campaignData, error: campaignError } = await supabase
      .from('campaigns')
      .insert({
        slug: `${slug}-${campaign.id}`, // Add ID to ensure uniqueness
        status: 'active',
        goal_amount: campaign.goal,
        raised_amount: campaign.raised,
        donor_count: campaign.supporters,
        days_left: campaign.daysLeft,
        category: campaign.category,
        featured: false
      })
      .select()
      .single()
    
    if (campaignError) {
      console.error(`Error creating campaign ${campaign.title}:`, campaignError)
      continue
    }
    
    // Create translation (English only for now)
    const { error: transError } = await supabase
      .from('campaign_translations')
      .insert({
        campaign_id: campaignData.id,
        language_code: 'en',
        title: campaign.title,
        story: campaign.story,
        full_story: campaign.fullStory,
        child_name: childName,
        child_age: childAge,
        location: 'Nairobi, Kenya' // Default or extract from data
      })
    
    if (transError) {
      console.error(`Error creating translation for ${campaign.title}:`, transError)
    } else {
      console.log(`✓ Migrated campaign: ${campaign.title}`)
    }
  }
}

migrateCampaigns().catch(console.error)
```

#### Image Migration

```typescript
// scripts/migrate-images.ts
// Script to upload static images and create mapping records

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const imageMappings = [
  { original: '@/assets/child-1.jpg', storage: 'content/child-1.jpg' },
  { original: '@/assets/child-2.jpg', storage: 'content/child-2.jpg' },
  { original: '@/assets/hero-background.jpg', storage: 'content/hero-background.jpg' },
  { original: '@/assets/community.jpg', storage: 'content/community.jpg' },
  { original: '@/assets/logo.jpg', storage: 'content/logo.jpg' },
]

async function migrateImages() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  for (const mapping of imageMappings) {
    // Read file from assets directory
    const filePath = path.join(process.cwd(), 'src', 'assets', 
      mapping.original.replace('@/assets/', ''))
    
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${mapping.original} - file not found`)
      continue
    }
    
    const fileBuffer = fs.readFileSync(filePath)
    const fileName = path.basename(filePath)
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(mapping.storage, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: false
      })
    
    if (uploadError) {
      console.error(`Error uploading ${mapping.original}:`, uploadError)
      continue
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(mapping.storage)
    
    // Create mapping record
    const { error: mappingError } = await supabase
      .from('static_image_mapping')
      .insert({
        original_path: mapping.original,
        storage_path: mapping.storage,
        storage_url: publicUrl,
        alt_text: fileName.replace('.jpg', '').replace(/-/g, ' ')
      })
    
    if (mappingError) {
      console.error(`Error creating mapping for ${mapping.original}:`, mappingError)
    } else {
      console.log(`✓ Migrated image: ${mapping.original}`)
    }
  }
}

migrateImages().catch(console.error)
```

---

## Security Considerations

1. **Row Level Security:** All tables have RLS enabled with optimized policies
2. **Server Actions:** All mutations require admin authentication
3. **Input Validation:** Zod schemas for all inputs
4. **SQL Injection:** Use parameterized queries (Supabase handles this)
5. **XSS Prevention:** Sanitize all user inputs, especially rich text content
6. **File Upload:** Validate file types, sizes, and scan for malware
7. **Rate Limiting:** Implement rate limiting on Server Actions
8. **Audit Logging:** All changes are logged with user tracking
9. **Session Security:** Secure, httpOnly cookies with SameSite protection
10. **CORS:** Properly configured CORS policies
11. **Environment Variables:** Never expose service role key to client
12. **Content Type Validation:** Validate JSONB content structure matches expected schema

---

## Performance Optimization

1. **Caching:** Use Next.js caching for public content with revalidation
2. **ISR:** Incremental Static Regeneration for campaign pages
3. **Image Optimization:** Next.js Image component + Supabase CDN
4. **Database Indexes:** Proper indexes on all query fields (already defined)
5. **Query Optimization:** Select only needed fields, use joins efficiently
6. **Pagination:** Implement pagination for lists (campaigns, media, audit log)
7. **Lazy Loading:** Load admin dashboard components lazily
8. **RLS Performance:** Use security definer functions instead of inline EXISTS queries
9. **Connection Pooling:** Supabase handles this automatically
10. **Cache Invalidation:** Use `revalidatePath` and `revalidateTag` after content updates
11. **Database Query Caching:** Consider using Supabase Edge Functions for frequently accessed data

---

## Testing Strategy

1. **Unit Tests:** Server Actions, utility functions
2. **Integration Tests:** Database operations, authentication
3. **E2E Tests:** Critical admin workflows
4. **Security Tests:** RLS policies, authentication flows
5. **Performance Tests:** Load testing, query optimization

---

## Documentation Requirements

1. **Admin User Guide:** How to use the admin dashboard
2. **Developer Documentation:** API reference, architecture decisions
3. **Database Schema Docs:** Table relationships, field descriptions
4. **Deployment Guide:** How to deploy and configure
5. **Troubleshooting Guide:** Common issues and solutions
6. **Environment Variables:** Complete list of required environment variables
7. **Migration Guide:** Step-by-step migration from hardcoded content

## Environment Variables

Required environment variables for the application:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]

# Server-side only (never expose to client)
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://chosenarrows.com

# Optional: Analytics, etc.
NEXT_PUBLIC_GA_ID=[google-analytics-id]
```

**Security Note:** The `SUPABASE_SERVICE_ROLE_KEY` should only be used in Server Actions and never exposed to the client. It bypasses RLS policies and should be handled with extreme care.

---

## Conclusion

This architecture provides a complete, scalable solution for managing all frontend content through an admin dashboard while maintaining the existing UI and user experience. The system is designed to be:

- **Flexible:** Easy to add new content types
- **Secure:** Comprehensive security measures
- **Performant:** Optimized for speed
- **Maintainable:** Clean code structure
- **Scalable:** Can grow with the organization

The implementation can be done incrementally, allowing for gradual migration and testing without disrupting the live site.
