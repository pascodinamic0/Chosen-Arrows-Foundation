# Admin Dashboard UI/UX Specification
## Chosen Arrows Foundation CMS

**Version:** 1.1 (Updated with Review Corrections)  
**Date:** 2025-01-27  
**Last Updated:** 2025-01-27

---

## Overview

This document provides detailed UI/UX specifications for the admin dashboard, including component designs, user flows, and interaction patterns.

---

## Design System

### Color Palette
- **Primary:** Match public site primary color
- **Secondary:** Match public site secondary color
- **Success:** Green (#10b981)
- **Warning:** Amber (#f59e0b)
- **Error:** Red (#ef4444)
- **Background:** Light gray (#f9fafb) / Dark mode support
- **Card:** White (#ffffff) / Dark card color

### Typography
- **Headings:** Inter or system font stack
- **Body:** Inter or system font stack
- **Monospace:** For code/JSON editors

### Spacing
- Consistent 4px base unit
- Standard spacing scale: 4, 8, 12, 16, 24, 32, 48, 64

---

## Layout Structure

### Main Layout

```
┌─────────────────────────────────────────────────────────┐
│  Top Bar: Logo | Search | Notifications | User Menu    │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│ Sidebar  │  Main Content Area                           │
│          │                                              │
│ - Home   │  [Page Content]                              │
│ - Content│                                              │
│ - Campaigns│                                            │
│ - Media  │                                              │
│ - Settings│                                             │
│ - Audit  │                                              │
│          │                                              │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

### Sidebar Navigation

**Component:** Persistent sidebar (collapsible on mobile)

**Items:**
- Dashboard (Home icon)
- Content
  - Sections
  - Pages
- Campaigns
- Testimonials
- Media Library
- Settings
- Audit Log

**States:**
- Active: Highlighted with primary color
- Hover: Subtle background change
- Expanded: Show sub-items (for Content)

---

## Page Specifications

### 1. Dashboard Home (`/admin/dashboard`)

**Purpose:** Overview of content status and quick actions

**Components:**
- **Stats Cards (4):**
  - Total Campaigns (active count)
  - Total Content Sections (last updated)
  - Pending Reviews (if applicable)
  - Recent Activity (last 7 days)

- **Quick Actions:**
  - Create New Campaign
  - Edit Hero Section
  - Add Testimonial
  - Upload Media

- **Recent Activity Feed:**
  - List of recent content changes
  - User, action, timestamp
  - Link to view/edit

- **Content Status Overview:**
  - Table showing all content sections
  - Last updated date
  - Translation status (EN/FR/ZH completeness)
  - Quick edit link

---

### 2. Content Sections Editor (`/admin/content/sections`)

#### Section List View

**Layout:**
- Search bar at top
- Filter by section type
- Grid/List toggle

**Section Cards:**
```
┌─────────────────────────────┐
│ Hero Section                │
│ Last updated: 2 days ago    │
│ Translations: EN ✓ FR ✓ ZH ✓│
│ [Edit] [Preview]            │
└─────────────────────────────┘
```

#### Section Editor View (`/admin/content/sections/[key]`)

**Layout:**
- Left: Form fields
- Right: Live preview (optional)

**Components:**

1. **Language Tabs**
   - EN | FR | ZH
   - Indicator for incomplete translations
   - "Copy from English" button

2. **Content Fields (Dynamic based on section)**

   **Hero Section:**
   - Badge (Text input)
   - Title (Text input)
   - Subtitle (Textarea)
   - CTA Button Text (Text input)
   - CTA Mentor Button Text (Text input)
   - Stats:
     - Children Supported (Number)
     - Active Mentors (Number)
     - Funds Raised (Number with currency)

   **Values Section:**
   - Title (Text input)
   - Subtitle (Text input)
   - Description (Textarea)
   - Values Array:
     - Add/Remove value
     - Each value: Title, Description
   - Vision Quote (Textarea)

   **Impact Section:**
   - Title (Text input)
   - Subtitle (Textarea)
   - Stats Array:
     - Value (Text/Number)
     - Label (Text)
     - Description (Text)
   - Transparency Title (Text input)
   - Transparency Description (Textarea)

3. **Action Buttons**
   - Save Draft (saves without publishing)
   - Publish (makes live)
   - Preview (opens preview modal)
   - Cancel (with unsaved changes warning)

4. **JSON Editor (Advanced Mode)**
   - Toggle to show raw JSON
   - Syntax highlighting
   - Validation errors display

---

### 3. Campaign Management

#### Campaign List (`/admin/campaigns`)

**Features:**
- Search campaigns
- Filter by: Status, Category, Featured
- Sort by: Date, Goal, Raised
- Bulk actions: Delete, Archive, Feature

**Table Columns:**
- Image (thumbnail)
- Title (campaign title)
- Status (badge)
- Goal / Raised (progress bar)
- Donors
- Days Left
- Category
- Actions (Edit, Delete, View)

**Note:** Campaigns use `title` field (not `name`) to match the codebase structure.

**Actions:**
- Create New Campaign button (top right)
- Quick edit (inline)
- Bulk select checkbox

#### Campaign Editor (`/admin/campaigns/[id]`)

**Tabs:**
1. **Basic Info**
   - Slug (auto-generated from name, editable)
   - Status (dropdown: Draft, Active, Completed, Archived)
   - Category (dropdown)
   - Featured (toggle)
   - Goal Amount (currency input)
   - Days Left (number input)
   - Raised Amount (currency input, auto-calculated or manual)
   - Donor Count (number input)

2. **Content** (per language)
   - Language tabs: EN | FR | ZH
   - Title (text input) - Campaign title
   - Story (rich text editor) - Short story for list view
   - Full Story (rich text editor) - Full story for detail page
   - Child Name (text input)
   - Child Age (number input)
   - Location (text input)
   
   **Note:** The `child` field displayed in the UI is automatically formatted as "Name, Age" from the separate `child_name` and `child_age` fields.

3. **Images**
   - Primary Image uploader
   - Additional Images (multiple upload)
   - Drag to reorder
   - Image alt text editor
   - Delete image (with confirmation)

4. **Updates**
   - List of campaign updates
   - Add new update
   - Edit/Delete updates
   - Update fields: Date, Content

5. **Preview**
   - Live preview of campaign page
   - Test different languages

**Save Actions:**
- Save Draft
- Publish (if status is Draft)
- Save & Continue Editing
- Cancel (with warning if unsaved)

---

### 4. Testimonials Management (`/admin/testimonials`)

**Layout:**
- List view with drag-and-drop reordering
- Add New button

**Testimonial Card:**
```
┌─────────────────────────────────┐
│ [Drag Handle]                   │
│                                 │
│ "Testimonial content..."       │
│                                 │
│ [Avatar] Name - Role           │
│                                 │
│ Active: [Toggle]  [Edit] [Delete]│
└─────────────────────────────────┘
```

**Add/Edit Form:**
- Name (text input)
- Role (text input)
- Content (textarea)
- Avatar Initials (text input, auto-generated from name)
- Display Order (number, auto-set by drag position)
- Active (toggle)

**Features:**
- Drag-and-drop reordering
- Inline editing (optional)
- Bulk activate/deactivate

---

### 5. Site Settings (`/admin/settings`)

**Tabs:**
1. **General**
   - Site Name
   - Site Description
   - Default Language
   - Timezone

2. **Contact Information**
   - Email Addresses (array)
   - Phone Number
   - Office Address
   - Office Hours (structured input)

3. **Social Media**
   - Facebook URL
   - Twitter URL
   - Instagram URL
   - LinkedIn URL

4. **Hero Stats**
   - Children Supported (number)
   - Active Mentors (number)
   - Funds Raised (currency)

5. **Impact Stats**
   - Add/Remove stat items
   - Each stat: Value, Label, Description

6. **Community Stats**
   - Donor Retention (%)
   - Average Rating
   - Transparency (%)

7. **SEO**
   - Default Meta Title
   - Default Meta Description
   - Default Meta Keywords
   - Open Graph Image
   - Twitter Card Image

**Save:** Single "Save All Settings" button at bottom

### 8. Page Metadata Management (`/admin/settings/metadata`)

**Purpose:** Manage SEO metadata for individual pages

**Features:**
- List all pages with metadata status
- Edit metadata per page
- Multi-language metadata support
- Preview how metadata appears in search results

**Page List:**
- Home (/)
- About (/about)
- Campaigns (/campaigns)
- Campaign Detail (/campaigns/[id])
- Contact (/contact)
- Mentorship (/mentorship)
- Donate (/donate)

**Metadata Fields (per language):**
- Page Title
- Meta Description
- Keywords (array)
- Open Graph Title
- Open Graph Description
- Open Graph Image URL
- Open Graph Type
- Twitter Card Type
- Twitter Title
- Twitter Description
- Twitter Image URL

**Save:** Per-page save button with revalidation

---

### 6. Content Sections Editor (`/admin/content/sections`)

**Additional Sections:**
- Navigation - Edit navigation menu items
- Donate Form - Edit impact messages and preset amounts
- Not Found - Edit 404 page content

**Donate Form Section Fields:**
- Impact Messages (array of text inputs)
  - "School supplies for 2 children"
  - "Weekly meals for 5 children"
  - "Medical checkup for 1 child"
- Preset Amounts (array of numbers)
  - Default: [25, 50, 100, 250, 500]
- Default Amount (number input)

### 7. Media Library (`/admin/media`)

**Layout:**
- Grid view of images
- Upload area at top
- Filter/Search sidebar

**Features:**
- Drag-and-drop upload
- Multiple file selection
- Image preview on hover
- Click to view full size
- Delete with confirmation
- Copy URL to clipboard
- Search by filename
- Filter by folder/type

**Upload Modal:**
- Drag-and-drop zone
- File browser
- Preview before upload
- Alt text input
- Folder selection
- Upload progress

---

### 8. Audit Log (`/admin/audit`)

**Layout:**
- Table view with filters
- Date range picker
- User filter
- Table filter

**Table Columns:**
- Timestamp
- User
- Action (Create/Update/Delete)
- Table
- Record ID
- View Details (expandable row)

**Details View:**
- Show old values vs new values
- Highlight differences
- JSON viewer for complex data

**Features:**
- Export to CSV
- Filter by date range
- Search by user/table
- Pagination

---

## Component Specifications

### Rich Text Editor

**Library:** Tiptap or similar

**Toolbar:**
- Bold, Italic, Underline
- Heading (H1, H2, H3)
- Bullet List, Numbered List
- Link
- Image
- Undo/Redo

**Features:**
- Auto-save draft
- Character count
- Word count
- Preview mode

### Image Uploader

**Component:** Custom with drag-and-drop

**Features:**
- Drag-and-drop zone
- Click to browse
- Multiple file selection
- Image preview
- Progress indicator
- Error handling (file type, size)
- Crop/resize tool (optional)

**Validation:**
- File types: jpg, jpeg, png, webp
- Max size: 5MB
- Max dimensions: 4000x4000

### JSON Editor

**Component:** Monaco Editor or similar

**Features:**
- Syntax highlighting
- Auto-format
- Validation errors
- Line numbers
- Search/replace
- Dark mode support

### Data Table

**Component:** shadcn/ui Table with enhancements

**Features:**
- Sorting (click column header)
- Filtering (per column)
- Pagination
- Row selection (checkbox)
- Bulk actions
- Export to CSV
- Responsive (mobile-friendly)

### Form Components

**Standard Inputs:**
- Text input
- Textarea
- Number input
- Currency input (with $ prefix)
- Date picker
- Select/Dropdown
- Toggle/Switch
- Radio group
- Checkbox

**Validation:**
- Real-time validation
- Error messages below field
- Required field indicator (*)
- Character/word count

### Toast Notifications

**Library:** Sonner (already in project)

**Types:**
- Success (green)
- Error (red)
- Warning (amber)
- Info (blue)

**Position:** Top-right
**Duration:** 3-5 seconds (configurable)

### Confirmation Dialogs

**Component:** Alert Dialog (shadcn/ui)

**Use Cases:**
- Delete confirmation
- Unsaved changes warning
- Publish confirmation

**Content:**
- Title
- Description
- Cancel button
- Confirm button (destructive styling for delete)

---

## User Flows

### Flow 1: Editing Hero Section

1. Navigate to Content → Sections
2. Click "Hero Section" card
3. Select language tab (EN/FR/ZH)
4. Edit fields (badge, title, subtitle, etc.)
5. Click "Save Draft" or "Publish"
6. See success toast
7. Redirect to sections list

### Flow 2: Creating Campaign

1. Navigate to Campaigns
2. Click "Create New Campaign"
3. Fill Basic Info tab
4. Switch to Content tab, select language
5. Fill campaign content (name, story, etc.)
6. Switch to Images tab
7. Upload primary image
8. Add campaign updates (optional)
9. Click "Publish"
10. See success toast
11. Redirect to campaign list

### Flow 3: Managing Testimonials

1. Navigate to Testimonials
2. Click "Add New"
3. Fill form (name, role, content)
4. Save
5. Drag to reorder (optional)
6. Toggle active/inactive
7. Edit or delete as needed

---

## Responsive Design

### Mobile (< 768px)
- Collapsible sidebar (hamburger menu)
- Stack form fields vertically
- Full-width tables with horizontal scroll
- Bottom navigation for quick actions
- Simplified toolbar

### Tablet (768px - 1024px)
- Collapsible sidebar
- Two-column forms where appropriate
- Responsive tables

### Desktop (> 1024px)
- Full sidebar always visible
- Multi-column layouts
- Hover states and tooltips
- Keyboard shortcuts

---

## Accessibility

- **WCAG 2.1 AA Compliance**
- Keyboard navigation support
- Screen reader support
- Focus indicators
- ARIA labels
- Color contrast ratios
- Alt text for all images
- Form labels and error messages

---

## Performance Considerations

- **Lazy Loading:** Load admin components on demand
- **Optimistic Updates:** Show changes immediately, sync in background
- **Debounced Inputs:** Debounce search and filter inputs
- **Virtual Scrolling:** For long lists (campaigns, media)
- **Image Optimization:** Compress images on upload
- **Caching:** Cache frequently accessed data

---

## Error Handling

### User-Facing Errors
- Clear error messages
- Inline field errors
- Toast notifications for server errors
- Retry mechanisms where appropriate

### Error States
- Network errors: Show retry button
- Validation errors: Highlight fields
- Permission errors: Show message and redirect
- 404 errors: Show helpful message

---

## Loading States

- **Skeleton Loaders:** For initial page loads
- **Spinner:** For button actions
- **Progress Bar:** For file uploads
- **Skeleton Cards:** For list items

---

## Success States

- **Toast Notifications:** For successful actions
- **Checkmarks:** Brief animation on success
- **Updated Timestamps:** Show "Saved X seconds ago"
- **Visual Feedback:** Subtle animations

---

## Future Enhancements

1. **Content Versioning:** View and restore previous versions
2. **Content Scheduling:** Schedule content to publish at specific times
3. **Bulk Operations:** Bulk edit multiple items
4. **Content Templates:** Save and reuse content structures
5. **Advanced Search:** Full-text search across all content
6. **Analytics Dashboard:** View content performance metrics
7. **Collaboration:** Comments and approval workflows
8. **Export/Import:** Export content for backup or migration

---

## Conclusion

This specification provides a comprehensive guide for building a modern, user-friendly admin dashboard that empowers content managers to efficiently manage all website content while maintaining the existing public-facing UI and user experience.
