# Zeabur Deployment Guide

Complete guide to deploy your Haoxin Listings application to Zeabur.

## 📋 Prerequisites

Before deploying, make sure you have:

- ✅ Neon database set up and connection string ready
- ✅ (Optional) Cloudinary account and credentials ready
- ✅ GitHub account
- ✅ Zeabur account (free tier available)

---

## 🚀 Deployment Steps

### Step 1: Push to GitHub (if not already done)

If you haven't pushed this project to GitHub yet:

```bash
cd haoxin-neon

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Neon migration complete"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Sign Up for Zeabur

1. Go to [https://zeabur.com](https://zeabur.com)
2. Click "Sign In" or "Get Started"
3. Sign in with GitHub (recommended)
4. Authorize Zeabur to access your repositories

### Step 3: Create New Project

1. Click **"Create Project"** in Zeabur dashboard
2. Give your project a name (e.g., "haoxin-listings")
3. Click "Create"

### Step 4: Deploy from GitHub

1. Click **"Add Service"** → **"Git"**
2. Select your repository: `haoxin-neon` (or whatever you named it)
3. Zeabur will automatically detect it's a static site
4. Click **"Deploy"**

### Step 5: Configure Environment Variables

**IMPORTANT**: Add your environment variables BEFORE the build completes.

1. Click on your service in Zeabur dashboard
2. Go to **"Variables"** tab
3. Click **"+ Add Variable"**
4. Add the following variables:

#### Required Variables

| Variable Name | Value | Where to Get |
|---------------|-------|--------------|
| `VITE_DATABASE_URL` | Your Neon connection string | Neon Console → Connection Details |

#### Optional Variables (for Cloudinary)

| Variable Name | Value | Where to Get |
|---------------|-------|--------------|
| `VITE_CLOUDINARY_CLOUD_NAME` | Your cloud name | Cloudinary Dashboard |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Your preset name | Cloudinary Settings → Upload |

**Example:**
```
VITE_DATABASE_URL=postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require
VITE_CLOUDINARY_CLOUD_NAME=haoxin-listings-2026
VITE_CLOUDINARY_UPLOAD_PRESET=ml_default
```

### Step 6: Trigger Rebuild (if already deployed)

If the service already built before you added variables:

1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on the latest deployment

Or simply push a new commit to GitHub to trigger a rebuild.

### Step 7: Get Your Domain

Zeabur provides a free domain:

1. Go to **"Networking"** tab
2. Click **"Generate Domain"**
3. You'll get a domain like: `your-app.zeabur.app`
4. (Optional) Add a custom domain if you have one

---

## ✅ Verification

After deployment:

1. Visit your Zeabur domain
2. Navigate to `/admin`
3. Login with password: `haoxin2026`
4. Check the database indicator shows **"Neon"** in green
5. Try adding a test listing
6. Upload an image (should show "雲端" if Cloudinary configured)

---

## 🔧 Build Configuration

The project includes `zeabur.json` with these settings:

```json
{
  "build": {
    "command": "bun install && bun run build"
  },
  "output": {
    "type": "static",
    "dir": "dist"
  }
}
```

**This is already configured and ready to use!**

---

## 🌐 Custom Domain (Optional)

To use your own domain:

### On Zeabur:

1. Go to **"Networking"** tab
2. Click **"Add Domain"**
3. Enter your custom domain (e.g., `listings.yourdomain.com`)
4. Zeabur will provide DNS records

### On Your Domain Provider:

1. Add the DNS records provided by Zeabur
2. Wait for DNS propagation (5-30 minutes)
3. Your site will be available at your custom domain

---

## 📊 Monitoring & Logs

### View Deployment Logs

1. Go to **"Deployments"** tab
2. Click on any deployment
3. View build logs and runtime logs

### Check Service Status

1. Dashboard shows service status (Running/Stopped/Building)
2. View metrics: CPU, Memory, Network usage

---

## 🔄 Updating Your Deployment

### Automatic Deployments

Zeabur automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update listings"
git push
```

Zeabur will automatically rebuild and redeploy!

### Manual Redeployment

1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on latest deployment

---

## 💰 Pricing

Zeabur offers:

- **Free Tier**: Includes free deployments and bandwidth
- **Pay as you go**: Only pay for what you use
- **No credit card required** for free tier

Check current pricing at: https://zeabur.com/pricing

---

## 🆘 Troubleshooting

### Build Fails

**Symptom**: Deployment fails during build

**Solutions**:
1. Check build logs in Zeabur dashboard
2. Verify `package.json` has correct scripts
3. Make sure all dependencies are in `package.json`
4. Try clearing build cache (Redeploy)

### Database Connection Error

**Symptom**: App works but shows "LocalStorage" instead of "Neon"

**Solutions**:
1. Verify `VITE_DATABASE_URL` is set in Zeabur Variables
2. Check connection string is complete (includes `?sslmode=require`)
3. Test connection string in Neon SQL Editor first
4. Redeploy after adding variables

### Images Not Uploading to Cloud

**Symptom**: Images show "本地" instead of "雲端"

**Solutions**:
1. Verify Cloudinary variables are set
2. Check upload preset is "Unsigned"
3. Test Cloudinary credentials locally first
4. Redeploy after adding variables

### 404 on Refresh

**Symptom**: Direct URLs work but refresh gives 404

**Solution**:
This is already handled! The project includes proper routing configuration for static deployments.

---

## 🔐 Security Best Practices

### Environment Variables

- ✅ Never commit `.env` file to Git (already in `.gitignore`)
- ✅ Add variables in Zeabur dashboard, not in code
- ✅ Use separate databases for production and development
- ✅ Rotate credentials periodically

### Neon Database

- ✅ Enable connection pooling in Neon for better performance
- ✅ Use Neon's built-in backup features
- ✅ Monitor database usage in Neon dashboard

### Admin Access

- ⚠️ Current password: `haoxin2026`
- 🔒 Consider changing this in `src/pages/Admin.tsx`
- 🔒 For production, implement proper authentication

---

## 📈 Performance Optimization

### Neon Optimizations

1. **Connection Pooling**: Neon automatically handles this
2. **Auto-scaling**: Neon scales automatically
3. **Caching**: Neon provides query caching

### Cloudinary Optimizations

1. **Auto-optimization**: Cloudinary optimizes images automatically
2. **CDN**: Images served from global CDN
3. **Lazy loading**: Already implemented in the app

---

## 📚 Additional Resources

- [Zeabur Documentation](https://zeabur.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- Project README: `README.md`
- Setup Guide: `SETUP_GUIDE.md`

---

## ✅ Deployment Checklist

- [ ] Neon database created and schema executed
- [ ] Cloudinary configured (optional)
- [ ] Code pushed to GitHub
- [ ] Zeabur account created
- [ ] Project created in Zeabur
- [ ] Service deployed from GitHub
- [ ] Environment variables added in Zeabur
- [ ] Service redeployed (if needed)
- [ ] Domain generated or custom domain configured
- [ ] Deployment verified (admin panel shows "Neon")
- [ ] Test CRUD operations on production
- [ ] Test image uploads on production

---

## 🎉 Success!

Your Haoxin Listings app is now live on Zeabur with:
- 🗄️ Neon PostgreSQL database
- ☁️ Cloudinary image storage
- 🚀 Automatic deployments from GitHub
- 🌐 Free Zeabur domain (or custom domain)

**Next Steps:**
1. Share your deployment URL
2. Add real listing data
3. Monitor usage in Zeabur dashboard
4. Consider custom domain for production
