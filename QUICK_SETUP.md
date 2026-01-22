# 🚀 Quick Supabase Setup

**Project:** https://mlqxwviojciosgbwfrws.supabase.co

---

## Step 1: Get API Keys (2 minutes)

1. Open: https://supabase.com/dashboard/project/mlqxwviojciosgbwfrws/settings/api
2. Copy:
   - **anon/public key** (under "Project API keys")
   - **service_role key** (keep secret!)

---

## Step 2: Create .env.local

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://mlqxwviojciosgbwfrws.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[paste-anon-key-here]
SUPABASE_SERVICE_ROLE_KEY=[paste-service-role-key-here]
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Step 3: Run Migration (5 minutes)

1. Open SQL Editor: https://supabase.com/dashboard/project/mlqxwviojciosgbwfrws/sql
2. Click **New Query**
3. Copy **entire file**: `supabase/migrations/001_initial_schema.sql`
4. Paste and click **Run**
5. ✅ Should see "Success. No rows returned"

---

## Step 4: Create Storage Bucket (2 minutes)

1. Go to: https://supabase.com/dashboard/project/mlqxwviojciosgbwfrws/storage/buckets
2. Click **New bucket**
3. Name: `images`
4. ✅ Check **Public bucket**
5. Click **Create bucket**

Then run in SQL Editor:
- Copy contents of `scripts/setup-storage.sql`
- Paste and run

---

## Step 5: Create Admin User (3 minutes)

### Create Auth User:
1. Go to: https://supabase.com/dashboard/project/mlqxwviojciosgbwfrws/auth/users
2. Click **Add User** → **Create new user**
3. Enter email & password
4. ✅ Check **Auto Confirm User**
5. Click **Create user**
6. **Copy the User ID** (UUID)

### Add to Admin Table:
1. Open SQL Editor
2. Copy `scripts/create-admin-user.sql`
3. Replace `[YOUR-USER-ID]` with your UUID
4. Replace `'Your Name'` with your name
5. Run the query

---

## Step 6: Verify Setup

```bash
npm run verify-setup
```

Or manually check:
- ✅ Tables exist (Table Editor)
- ✅ Admin user exists (`admin_users` table)
- ✅ Storage bucket exists (`images` bucket)

---

## Step 7: Test Login

```bash
npm run dev
```

Visit: http://localhost:3000/admin/login

---

## 🎉 Done!

You can now:
- ✅ Login to admin dashboard
- ✅ Manage content
- ✅ Create campaigns
- ✅ Upload images
- ✅ View audit logs

---

## Need Help?

See `SUPABASE_SETUP.md` for detailed troubleshooting.
