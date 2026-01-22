-- Create Admin User
-- Replace [YOUR-USER-ID] with the UUID from Authentication → Users
-- Replace 'Your Name' with your actual name

INSERT INTO admin_users (id, role, full_name)
VALUES (
  'fd41f49b-ca99-44b6-b40c-8159c072a141',
  'super_admin',
  'Pascal Digny'
)
ON CONFLICT (id) DO UPDATE
SET role = 'super_admin',
    full_name = 'Pascal Digny',
    updated_at = NOW();