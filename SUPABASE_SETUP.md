# Supabase Setup Guide
## Quick Setup for Chosen Arrows Foundation

**Project URL:** https://mlqxwviojciosgbwfrws.supabase.co

---

## Step 1: Get Your API Keys

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/mlqxwviojciosgbwfrws
2. Navigate to **Settings** → **API**
3. Copy the following:
   - **Project URL**: `https://mlqxwviojciosgbwfrws.supabase.co`
   - **anon/public key**: (under "Project API keys")
   - **service_role key**: (under "Project API keys" - keep this secret!)

---

## Step 2: Create Environment File

I'll create a `.env.local` file for you. You just need to add your API keys.

**File location:** `.env.local` (in project root)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://mlqxwviojciosgbwfrws.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[paste-your-anon-key-here]
SUPABASE_SERVICE_ROLE_KEY=[paste-your-service-role-key-here]
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Step 3: Run Database Migration

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL Editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. Verify success - you should see "Success. No rows returned"

**Expected Result:**
- All tables created
- All indexes created
- All RLS policies enabled
- All triggers created

---

## Step 4: Set Up Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name: `images`
4. **Public bucket**: ✅ Enable (check this box)
5. Click **Create bucket**

### Set Storage Policies

Go to **SQL Editor** and run:

```sql
-- Allow public read access
CREATE POLICY "Public can read images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow authenticated admins to upload
CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' AND
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
  )
);

-- Allow authenticated admins to delete
CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'images' AND
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
  )
);
```

---

## Step 5: Create Admin User

### Option A: Via Supabase Dashboard (Recommended)

1. Go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter:
   - **Email**: your-email@example.com
   - **Password**: (choose a strong password)
   - **Auto Confirm User**: ✅ Enable
4. Click **Create user**
5. **Copy the User ID** (UUID) - you'll need this next

### Option B: Via SQL (If you already have a user)

1. Go to **Authentication** → **Users**
2. Find your user and copy the **User ID** (UUID)

### Add User to Admin Table

1. Go to **SQL Editor**
2. Run this query (replace `[YOUR-USER-ID]` with the UUID from above):

```sql
INSERT INTO admin_users (id, role, full_name)
VALUES (
  '[YOUR-USER-ID]',
  'super_admin',
  'Your Name'
);
```

**Example:**
```sql
INSERT INTO admin_users (id, role, full_name)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'super_admin',
  'Admin User'
);
```

---

## Step 6: Verify Setup

1. **Check Tables:**
   - Go to **Table Editor**
   - Verify these tables exist:
     - `content_sections`
     - `content_translations`
     - `campaigns`
     - `campaign_translations`
     - `campaign_images`
     - `campaign_updates`
     - `testimonials`
     - `site_settings`
     - `admin_users`
     - `content_audit_log`
     - `page_metadata`
     - `static_image_mapping`

2. **Check Storage:**
   - Go to **Storage** → **images** bucket
   - Verify bucket exists and is public

3. **Check Admin User:**
   - Go to **Table Editor** → `admin_users`
   - Verify your user appears with role `super_admin`

4. **Test Login:**
   ```bash
   npm run dev
   ```
   - Navigate to `http://localhost:3000/admin/login`
   - Try logging in with your admin credentials

---

## Troubleshooting

### "NEXT_PUBLIC_SUPABASE_URL is not defined"
- ✅ Check `.env.local` exists in project root
- ✅ Restart dev server after creating `.env.local`
- ✅ Verify no typos in variable names

### "Not an admin user" error
- ✅ Verify user exists in `admin_users` table
- ✅ Check User ID matches auth.users ID exactly
- ✅ Verify role is set (super_admin, admin, or editor)

### RLS policies blocking queries
- ✅ Verify migration ran successfully
- ✅ Check `is_admin_user()` function exists (in SQL Editor, run: `SELECT is_admin_user();`)
- ✅ Verify admin user has correct role

### Storage upload fails
- ✅ Verify `images` bucket exists
- ✅ Check bucket is set to Public
- ✅ Verify storage policies are created
- ✅ Check user is authenticated and in `admin_users` table

---

## Next Steps

Once setup is complete:

1. ✅ Test admin login at `/admin/login`
2. ✅ Explore admin dashboard
3. ✅ Create test content
4. ✅ Upload test images
5. ✅ View audit log

---

## Quick Reference

**Project Dashboard:** https://supabase.com/dashboard/project/mlqxwviojciosgbwfrws

**API Settings:** https://supabase.com/dashboard/project/mlqxwviojciosgbwfrws/settings/api

**SQL Editor:** https://supabase.com/dashboard/project/mlqxwviojciosgbwfrws/sql

**Storage:** https://supabase.com/dashboard/project/mlqxwviojciosgbwfrws/storage/buckets

**Authentication:** https://supabase.com/dashboard/project/mlqxwviojciosgbwfrws/auth/users

---

**Status:** Ready for setup! 🚀
