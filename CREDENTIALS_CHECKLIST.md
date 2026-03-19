# Credentials Checklist

Use this checklist to gather all the credentials you need.

## ✅ What You Need

### 1️⃣ Neon Database (Required)

| What | Where to Find | Example |
|------|---------------|---------|
| **Connection String** | Neon Console → Connection Details | `postgresql://user:pass@ep-xxx-123.aws.neon.tech/neondb?sslmode=require` |

**Status:** [ ] Obtained [ ] Added to `.env` [ ] Tested

---

### 2️⃣ Cloudinary Storage (Optional)

| What | Where to Find | Example |
|------|---------------|---------|
| **Cloud Name** | Cloudinary Dashboard → Product Environment Credentials | `haoxin-listings-2026` |
| **Upload Preset** | Settings → Upload → Upload Presets | `ml_default` or custom |

**Status:** [ ] Account Created [ ] Preset Created [ ] Added to `.env` [ ] Tested

---

## 📋 Quick Copy Template

Once you have your credentials, copy this template:

```bash
# Copy everything below into your .env file

# Neon Database
VITE_DATABASE_URL=paste_your_neon_connection_string_here

# Cloudinary (optional - remove these lines if not using)
VITE_CLOUDINARY_CLOUD_NAME=paste_your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=paste_your_preset_name_here
```

---

## 🔍 How to Verify

After adding credentials to `.env`:

1. **Restart dev server**: Stop (Ctrl+C) and run `bun dev`
2. **Visit admin**: http://localhost:8080/admin
3. **Check indicators**:
   - Database: Should show "Neon" in green
   - Images: Should show "雲端" when using Cloudinary

---

## ⚠️ Important Notes

- ✅ `.env` file is already in `.gitignore` - safe to use
- ❌ Never share your `.env` file or credentials publicly
- 💾 Keep a secure backup of your credentials
- 🔄 If credentials change, update `.env` and restart server

---

## 🆘 Still Stuck?

1. See **SETUP_GUIDE.md** for detailed instructions
2. See **QUICK_START.md** for fast setup
3. Check **Troubleshooting** section in SETUP_GUIDE.md
