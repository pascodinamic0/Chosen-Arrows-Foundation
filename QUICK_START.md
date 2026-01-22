# Quick Start Guide
## Get Your Supabase Project Running in 10 Minutes

---

## 🚀 Quick Setup (5 Steps)

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com) → **New Project**
- Fill in name, password, region
- Wait 2-3 minutes for setup

### 2. Get Your API Keys
- In Supabase: **Settings** → **API**
- Copy: Project URL, anon key, service_role key

### 3. Configure Environment
```bash
# Copy the example file
cp env.example .env.local

# Edit .env.local and paste your keys
# Use your favorite editor (VS Code, nano, etc.)
```

### 4. Run Database Migration
- In Supabase: **SQL Editor** → **New query**
- Open: `supabase/migrations/001_initial_schema.sql`
- Copy ALL SQL code → Paste → **Run**

### 5. Create Admin User
- In Supabase: **Authentication** → **Users** → **Add user**
- Create user with email/password
- Copy the User ID (UUID)
- In **SQL Editor**, run:
```sql
INSERT INTO admin_users (id, role, full_name)
VALUES ('YOUR-USER-UUID', 'super_admin', 'Your Name');
```

---

## ✅ Verify Setup

```bash
# Install tsx if needed (for verification script)
npm install --save-dev tsx

# Run verification
npm run verify-setup
```

Or start the dev server:
```bash
npm run dev
```

Then visit: `http://localhost:3000/admin/login`

---

## 📚 Detailed Instructions

For step-by-step instructions with screenshots and troubleshooting:
- See **`SUPABASE_SETUP_CHECKLIST.md`** for complete guide

---

## 🎯 What's Next?

After setup is complete:
1. ✅ Create admin login page
2. ✅ Build admin dashboard
3. ✅ Migrate existing content
4. ✅ Start managing content!

---

**Need Help?** Check `SETUP_GUIDE.md` or `SUPABASE_SETUP_CHECKLIST.md`
