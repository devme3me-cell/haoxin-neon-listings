# Quick Start - Database & Storage Setup

Follow these simple steps to get your application connected to Neon database and Cloudinary storage.

## 🚀 Fast Track (10 minutes total)

### Step 1: Neon Database (5 min)

1. Go to: **https://console.neon.tech**
2. Sign up (use GitHub for fastest)
3. Create project → name it "haoxin-listings"
4. Copy connection string (looks like `postgresql://...`)
5. Open Neon **SQL Editor**
6. Copy entire `neon-schema.sql` file and paste → Run
7. ✅ You should see "10 rows affected"

### Step 2: Cloudinary Storage (3 min) - OPTIONAL

1. Go to: **https://cloudinary.com/users/register/free**
2. Sign up and verify email
3. Note your **Cloud Name** from dashboard
4. Settings → Upload → Add Upload Preset
5. Set **Signing Mode** to **Unsigned** → Save
6. Copy the **preset name**

### Step 3: Configure App (2 min)

1. Rename `.env.setup` to `.env`
2. Fill in your credentials:
   ```bash
   VITE_DATABASE_URL=your_neon_connection_string
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name
   ```
3. Save the file
4. Restart dev server: `bun dev`

### Step 4: Verify (1 min)

1. Visit: http://localhost:8080/admin
2. Password: `haoxin2026`
3. Look for **green "Neon"** badge at top
4. Add a test listing with image
5. Image should show **"雲端"** (cloud) badge

## ✅ Done!

Your app is now connected to:
- 🗄️ Neon PostgreSQL database
- ☁️ Cloudinary image storage

---

## 📖 Need More Details?

See **SETUP_GUIDE.md** for detailed step-by-step instructions with screenshots.

## ❓ Issues?

Common fixes:
- **Still shows "LocalStorage"?** → Restart dev server
- **Connection error?** → Check `.env` has no typos
- **Images still local?** → Cloudinary credentials might be wrong

See SETUP_GUIDE.md "Troubleshooting" section.
