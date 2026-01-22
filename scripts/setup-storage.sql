-- Storage Policies for images bucket
-- Run this in Supabase SQL Editor after creating the 'images' bucket

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

-- Allow authenticated admins to update
CREATE POLICY "Admins can update images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'images' AND
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
  )
);
