# Migration Guide: Supabase to Neon

This document explains the migration from Supabase to Neon Database.

## What Changed

### Database
- **From:** Supabase PostgreSQL
- **To:** Neon PostgreSQL
- **Driver:** `@neondatabase/serverless`

### Storage
- **From:** Supabase Storage
- **To:** Cloudinary
- **Why:** Neon is a database-only service and doesn't provide file storage

### Real-time
- **From:** Supabase Realtime subscriptions
- **To:** Removed (Neon doesn't have built-in real-time)
- **Note:** You can manually refresh data or implement polling if needed

## Setup Instructions

### 1. Create a Neon Database

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Create a new project
3. Copy your database connection string

### 2. Set up Cloudinary (Optional, for image uploads)

1. Go to [https://cloudinary.com/console](https://cloudinary.com/console)
2. Create a free account
3. Note your Cloud Name
4. Create an unsigned upload preset:
   - Go to Settings → Upload
   - Scroll to "Upload presets"
   - Click "Add upload preset"
   - Set Signing Mode to "Unsigned"
   - Copy the preset name

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Neon Database Configuration
VITE_DATABASE_URL=your_neon_database_url_here

# Cloudinary Configuration (optional - for cloud image uploads)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_here
```

### 4. Run the Database Schema

1. Open your Neon SQL Editor
2. Copy and paste the contents of `neon-schema.sql`
3. Execute the SQL

## File Changes

### New Files
- `src/lib/neon.ts` - Neon database client
- `src/lib/cloudinary-storage.ts` - Cloudinary image upload utilities
- `neon-schema.sql` - Database schema for Neon
- `MIGRATION_GUIDE.md` - This file

### Modified Files
- `src/context/ListingsContext.tsx` - Updated to use Neon instead of Supabase
- `src/components/ui/image-upload.tsx` - Updated to use Cloudinary
- `src/pages/Admin.tsx` - Updated database indicator
- `.env.example` - Updated environment variables

### Deleted Files
- `src/lib/supabase.ts`
- `src/lib/supabase-storage.ts`
- `supabase-schema.sql`

## Code Changes Summary

### Database Operations
All database operations now use the Neon serverless driver:

```typescript
// Before (Supabase)
const { data, error } = await supabase.from("listings").select("*");

// After (Neon)
const data = await listingsQuery.getAll();
```

### Image Uploads
Image uploads now use Cloudinary:

```typescript
// Before (Supabase Storage)
import { uploadImage } from "@/lib/supabase-storage";

// After (Cloudinary)
import { uploadImage } from "@/lib/cloudinary-storage";
```

### Context Changes
- `isUsingSupabase` → `isUsingNeon`
- Removed real-time subscription
- Same API for CRUD operations

## Deployment

The application works with both Neon and localStorage fallback:

1. **With Neon configured:** Data is stored in Neon database
2. **Without Neon configured:** Data is stored in browser localStorage

This allows you to:
- Test locally without setting up a database
- Deploy without immediate database setup
- Gradually migrate data

## Testing

1. Install dependencies: `bun install`
2. Start dev server: `bun dev`
3. Visit `/admin` (password: haoxin2026)
4. Test CRUD operations
5. Check database indicator shows "Neon" if configured, "LocalStorage" otherwise

## Notes

- Neon's serverless driver is optimized for edge and serverless environments
- Cloudinary has a generous free tier for image hosting
- If you don't configure Cloudinary, images will be stored as base64 in the database (not recommended for production)
- Consider implementing polling or webhooks if you need real-time updates
