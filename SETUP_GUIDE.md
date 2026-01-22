# Setup Guide
## Chosen Arrows Foundation CMS - Phase 1 Implementation

This guide will help you set up the backend infrastructure and admin dashboard foundation.

---

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier is sufficient)
- Git repository access

---

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- `@supabase/ssr` - For Next.js App Router integration
- `@supabase/supabase-js` - Supabase JavaScript client

---

## Step 2: Set Up Supabase Project

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Configure Environment Variables**
   - Create a `.env.local` file in the project root:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
   SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   **Important:** 
   - Never commit `.env.local` to git
   - The service role key bypasses RLS - keep it secret!

3. **Run Database Migration**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy the contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run the migration
   - Verify all tables were created successfully

---

## Step 3: Set Up Supabase Storage

1. **Create Storage Bucket**
   - Go to Storage in Supabase dashboard
   - Create a new bucket named `images`
   - Set it to **Public** (for public image access)
   - Configure CORS if needed

2. **Set Storage Policies** (Optional - for admin-only uploads)
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
   ```

---

## Step 4: Create Initial Admin User

1. **Enable Email Auth in Supabase**
   - Go to Authentication → Providers
   - Ensure Email provider is enabled

2. **Create Admin User via Supabase Dashboard**
   - Go to Authentication → Users
   - Click "Add User"
   - Create a user with email/password
   - Note the user ID (UUID)

3. **Add User to Admin Table**
   - Go to SQL Editor
   - Run this query (replace with your user ID):
   ```sql
   INSERT INTO admin_users (id, role, full_name)
   VALUES (
     '[your-user-uuid]',
     'super_admin',
     'Your Name'
   );
   ```

---

## Step 5: Verify Setup

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Admin Login**
   - Navigate to `http://localhost:3000/admin/login`
   - Try logging in with your admin credentials
   - You should be redirected to `/admin/dashboard` (if it exists)

3. **Test Database Connection**
   - Check Supabase dashboard → Table Editor
   - Verify all tables are created
   - Check that your admin user appears in `admin_users` table

---

## Step 6: Next Steps

Now that Phase 1 is set up, you can proceed with:

1. **Create Admin Dashboard Pages**
   - `/app/admin/login/page.tsx` - Login page
   - `/app/admin/dashboard/page.tsx` - Dashboard home
   - `/app/admin/layout.tsx` - Admin layout

2. **Implement Content Management**
   - Create content editor components
   - Set up Server Actions for content CRUD
   - Build content section editors

3. **Migrate Existing Content**
   - Run migration scripts to import i18n JSON
   - Upload static images to Supabase Storage
   - Create image mapping records

---

## Troubleshooting

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not defined"
- **Solution:** Ensure `.env.local` exists and contains all required variables
- Restart the dev server after adding environment variables

### Issue: "Not an admin user" error
- **Solution:** Verify the user exists in `admin_users` table
- Check that the user ID matches the auth.users ID

### Issue: RLS policies blocking queries
- **Solution:** Verify `is_admin_user()` function exists
- Check that admin user has correct role in `admin_users` table

### Issue: Middleware not working
- **Solution:** Ensure `middleware.ts` is in the project root
- Check that `@supabase/ssr` is installed
- Verify environment variables are set

---

## File Structure Created

```
├── src/lib/supabase/
│   ├── server.ts          # Server-side Supabase client
│   └── client.ts          # Client-side Supabase client
├── app/actions/
│   ├── auth/
│   │   ├── check-admin-auth.ts
│   │   └── admin-login.ts
│   └── content/
│       └── get-content.ts
├── supabase/migrations/
│   └── 001_initial_schema.sql
├── middleware.ts          # Admin route protection
└── .env.local            # Environment variables (create this)
```

---

## Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] Service role key is never exposed to client
- [ ] RLS policies are enabled on all tables
- [ ] Admin routes are protected by middleware
- [ ] All Server Actions check admin authentication

---

## Support

For issues or questions:
1. Check the architecture specification (`ARCHITECTURE_SPEC.md`)
2. Review the review document (`SPEC_REVIEW.md`)
3. Check Supabase documentation

---

**Status:** Phase 1 Foundation - ✅ Ready for Implementation
