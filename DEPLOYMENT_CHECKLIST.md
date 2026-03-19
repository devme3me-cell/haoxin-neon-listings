# 🚀 Quick Deployment Checklist

Use this checklist to deploy to Zeabur in 10 minutes!

## ✅ Pre-Deployment (5 minutes)

### 1. Database Setup
- [ ] Neon account created
- [ ] Database project created in Neon
- [ ] Ran `neon-schema.sql` in Neon SQL Editor
- [ ] Verified 10 rows inserted successfully
- [ ] Connection string copied and saved

### 2. Storage Setup (Optional)
- [ ] Cloudinary account created
- [ ] Cloud name noted
- [ ] Unsigned upload preset created
- [ ] Preset name copied

### 3. Code Ready
- [ ] All changes committed to Git
- [ ] Code pushed to GitHub
- [ ] Repository is public or Zeabur has access

---

## 🌐 Zeabur Deployment (5 minutes)

### 1. Zeabur Setup
- [ ] Signed up at https://zeabur.com
- [ ] Connected GitHub account
- [ ] Created new project in Zeabur

### 2. Deploy Service
- [ ] Clicked "Add Service" → "Git"
- [ ] Selected repository
- [ ] Deployment started automatically

### 3. Configure Variables
- [ ] Added `VITE_DATABASE_URL` in Variables tab
- [ ] Added `VITE_CLOUDINARY_CLOUD_NAME` (optional)
- [ ] Added `VITE_CLOUDINARY_UPLOAD_PRESET` (optional)
- [ ] Redeployed service

### 4. Get Domain
- [ ] Generated Zeabur domain
- [ ] Noted deployment URL

---

## ✅ Verification (2 minutes)

### Test Deployment
- [ ] Visited deployment URL
- [ ] Homepage loads correctly
- [ ] Navigated to `/admin`
- [ ] Logged in (password: `haoxin2026`)
- [ ] Database indicator shows "Neon" (green)
- [ ] Tried adding a test listing
- [ ] Image upload works (shows "雲端" if Cloudinary configured)
- [ ] Listing appears in public view
- [ ] Edited listing successfully
- [ ] Deleted test listing

---

## 🎯 Production Ready

### Final Steps
- [ ] Removed test listings
- [ ] Added real listing data
- [ ] Tested on mobile device
- [ ] Shared URL with stakeholders
- [ ] Bookmarked Zeabur dashboard

---

## 📝 Important Information

**Save These URLs:**
- Zeabur Dashboard: https://zeabur.com/dashboard
- Your Deployment: `_____________________________`
- Neon Console: https://console.neon.tech
- Cloudinary Dashboard: https://cloudinary.com/console

**Admin Access:**
- URL: `your-domain.zeabur.app/admin`
- Password: `haoxin2026`

---

## 🆘 Issues?

If something doesn't work:

1. **Check environment variables** in Zeabur
2. **View deployment logs** in Zeabur dashboard
3. **Verify Neon connection** in Neon SQL Editor
4. **See ZEABUR_DEPLOYMENT.md** for troubleshooting

---

## ✨ Success Criteria

Your deployment is successful when:
- ✅ Homepage loads without errors
- ✅ Admin panel accessible
- ✅ Database shows "Neon" in green
- ✅ Can create/edit/delete listings
- ✅ Images upload to cloud (if configured)
- ✅ All pages work correctly
- ✅ Mobile responsive

---

**Time to Deploy:** ~10-15 minutes
**Difficulty:** Easy
**Cost:** Free (on free tier)

🎉 **You're ready to deploy!** Follow **ZEABUR_DEPLOYMENT.md** for detailed instructions.
