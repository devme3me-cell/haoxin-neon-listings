# Setup Guide - Neon Database + Cloudinary

This guide will help you set up Neon PostgreSQL database and Cloudinary image storage for your Haoxin Listings application.

## 📋 Prerequisites

- A web browser
- Email address for account creation

---

## Part 1: Neon Database Setup (5 minutes)

### Step 1: Create Neon Account

1. Visit [https://console.neon.tech](https://console.neon.tech)
2. Click "Sign Up"
3. Choose one of:
   - GitHub (recommended - fastest)
   - Google
   - Email

### Step 2: Create Your Project

1. After logging in, click **"Create a project"**
2. Fill in the details:
   - **Project name**: `haoxin-listings` (or your preferred name)
   - **Region**: Choose closest to your users
     - `US East (N. Virginia)` for USA
     - `Europe (Frankfurt)` for Europe
     - `Asia Pacific (Singapore)` for Asia
   - **PostgreSQL version**: Leave default (16)
3. Click **"Create project"**
4. Wait 10-20 seconds for provisioning

### Step 3: Get Your Connection String

1. On the project dashboard, look for **"Connection Details"** section
2. Make sure the dropdown shows:
   - Database: `neondb`
   - Role: (your username)
3. Click **"Copy"** next to the connection string
4. **Save this somewhere safe!** It looks like:
   ```
   postgresql://username:password@ep-random-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### Step 4: Run the Database Schema

1. In Neon console, click **"SQL Editor"** in the left sidebar
2. Open your project folder and locate `neon-schema.sql`
3. Copy the **entire contents** of that file
4. Paste it into the SQL Editor
5. Click **"Run"** button (or press Ctrl+Enter)
6. You should see: "Success! 10 rows affected" (the initial data)

### Step 5: Verify Setup

1. In the SQL Editor, run this query:
   ```sql
   SELECT COUNT(*) FROM listings;
   ```
2. You should see the result: `10`
3. ✅ Database is ready!

---

## Part 2: Cloudinary Setup (Optional - 3 minutes)

Cloudinary provides free cloud storage for images. If you skip this, images will be stored as base64 (not recommended for production).

### Step 1: Create Cloudinary Account

1. Visit [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Fill in the registration form:
   - Email
   - Password
   - Create a unique cloud name (e.g., `haoxin-listings-2026`)
     - **Important**: Save this cloud name!
3. Click "Create Account"
4. Verify your email

### Step 2: Get Your Cloud Name

1. After logging in, you'll see the Dashboard
2. Look for **"Product Environment Credentials"** section
3. Find **"Cloud name"**: This is what you need!
4. **Save this** - you'll use it in Step 4

### Step 3: Create Upload Preset

This allows your app to upload images without exposing secret keys.

1. Click on **"Settings"** (gear icon) in the top right
2. Click on **"Upload"** tab in the left sidebar
3. Scroll down to **"Upload presets"** section
4. Click **"Add upload preset"**
5. Configure:
   - **Preset name**: Leave auto-generated or use `haoxin_unsigned`
   - **Signing Mode**: Select **"Unsigned"** ⚠️ Important!
   - **Folder**: (optional) enter `haoxin-listings`
   - Leave other settings as default
6. Click **"Save"**
7. **Copy the preset name** (shown at the top)

### Step 4: Note Your Credentials

You should now have:
- ✅ **Cloud Name**: `your-cloud-name`
- ✅ **Upload Preset**: `your-preset-name` (or auto-generated)

---

## Part 3: Configure Your Application

### Step 1: Create .env File

1. In your project root (`haoxin-neon` folder), create a file named `.env`
2. Copy the template below and **fill in your actual values**:

```bash
# Neon Database Connection
VITE_DATABASE_URL=postgresql://username:password@ep-xxx.aws.neon.tech/neondb?sslmode=require

# Cloudinary Configuration (optional - remove if not using)
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-preset-name
```

### Step 2: Replace Placeholder Values

Replace these with your actual credentials:

1. **VITE_DATABASE_URL**: Paste your Neon connection string from Part 1, Step 3
2. **VITE_CLOUDINARY_CLOUD_NAME**: Your cloud name from Part 2, Step 2
3. **VITE_CLOUDINARY_UPLOAD_PRESET**: Your preset name from Part 2, Step 3

### Example (with fake credentials):

```bash
# Neon Database Connection
VITE_DATABASE_URL=postgresql://sam_user:AbCd1234XyZ@ep-cool-sound-123456.us-east-2.aws.neon.tech/neondb?sslmode=require

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=haoxin-listings-2026
VITE_CLOUDINARY_UPLOAD_PRESET=ml_default
```

### Step 3: Test Your Setup

1. Make sure dev server is running:
   ```bash
   bun dev
   ```

2. Visit http://localhost:8080/admin
3. Password: `haoxin2026`
4. Check the database indicator at the top:
   - Should show **"Neon"** in green ✅
   - If it shows "LocalStorage" in amber, check your `.env` file

5. Try adding a test listing:
   - Click "+ 新增物件"
   - Fill in the form
   - Upload an image
   - Click "新增"
   - If configured correctly, image indicator should show "雲端" (cloud)

---

## 🎉 Success Checklist

- ✅ Neon database created
- ✅ Database schema executed
- ✅ Connection string obtained
- ✅ Cloudinary account created (optional)
- ✅ Upload preset created (optional)
- ✅ `.env` file configured
- ✅ Admin panel shows "Neon" database
- ✅ Can add/edit/delete listings
- ✅ Images upload to cloud (if Cloudinary configured)

---

## 🆘 Troubleshooting

### Database shows "LocalStorage" instead of "Neon"

**Cause**: Environment variables not loaded or incorrect connection string

**Solutions**:
1. Check `.env` file is in the root directory (same level as `package.json`)
2. Restart dev server: Stop (Ctrl+C) and run `bun dev` again
3. Verify connection string has no spaces or line breaks
4. Make sure variable name is exactly: `VITE_DATABASE_URL`

### Image shows "本地" (local) instead of "雲端" (cloud)

**Cause**: Cloudinary not configured or credentials incorrect

**Solutions**:
1. Check all three Cloudinary variables in `.env`
2. Verify cloud name has no typos
3. Make sure upload preset is "Unsigned"
4. Restart dev server

### "Failed to fetch" or database errors

**Cause**: Network issue or incorrect Neon connection string

**Solutions**:
1. Check your internet connection
2. Verify Neon project is active (not paused)
3. Try running a test query in Neon SQL Editor
4. Check connection string includes `?sslmode=require`

### Can't create upload preset in Cloudinary

**Cause**: Wrong settings screen or account limitations

**Solutions**:
1. Make sure you're in Settings → Upload tab
2. Scroll down to find "Upload presets" section
3. Free tier should allow unsigned presets
4. Contact Cloudinary support if issue persists

---

## 📚 Additional Resources

- [Neon Documentation](https://neon.tech/docs/introduction)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Project README](./README.md)
- [Migration Guide](./MIGRATION_GUIDE.md)

---

## 🔒 Security Notes

1. **Never commit `.env` file to Git** - it's already in `.gitignore`
2. **Don't share your connection string** - it contains your password
3. **Cloudinary upload preset must be unsigned** for frontend uploads
4. **Use environment variables** in deployment platforms

---

## ⏭️ Next Steps

After setup is complete:

1. Test all CRUD operations in admin panel
2. Add your real listing data
3. Deploy to production (Netlify/Vercel)
4. Add environment variables to deployment platform
5. Test production deployment

---

**Need help?** Check the MIGRATION_GUIDE.md or contact support.
