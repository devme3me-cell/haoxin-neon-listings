# Haoxin Listings - Neon Version

A modern web application for managing memorial service listings, powered by Neon PostgreSQL database via HTTP API.

## 🎯 What's New

This project uses **Neon's official serverless driver** for database access:

- ✅ **@neondatabase/serverless** - Official Neon driver for HTTP queries
- ✅ **Optimized for Edge** - Low-latency queries via HTTP
- ✅ **SQL Template Strings** - Safe, injection-proof queries
- ✅ **Cloudinary** - Cloud image storage (optional)
- ✅ **localStorage fallback** - Works without database for testing
- ✅ **Full TypeScript** - Type-safe database operations

## 🚀 Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment (Optional)

Copy `.env.example` to `.env` and configure:

```bash
# Neon Database (optional - uses localStorage if not configured)
VITE_DATABASE_URL=your_neon_database_url

# Cloudinary (optional - uses base64 if not configured)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 3. Start Development Server

```bash
bun dev
```

The app will run on `http://localhost:8080`

## 📦 Features

### Public Features
- Browse memorial service listings
- Filter by type (出售/收購)
- Search by title, location, or owner
- View sold status
- Responsive design

### Admin Features (Password: `haoxin2026`)
- Add new listings
- Edit existing listings
- Delete listings
- Toggle sold status
- Upload images (cloud or local)
- Reset to default data
- Database status indicator

## 🗄️ Database Setup (Optional)

If you want to use Neon database instead of localStorage:

### 1. Create Neon Database

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Create a new project
3. Copy the connection string

### 2. Run Schema

1. Open Neon SQL Editor
2. Copy contents from `neon-schema.sql`
3. Execute the SQL

### 3. Update .env

```bash
VITE_DATABASE_URL=postgresql://user:password@host/database
```

## 🖼️ Image Storage

### Option 1: Cloudinary (Recommended for Production)

1. Create account at [https://cloudinary.com](https://cloudinary.com)
2. Get your Cloud Name
3. Create unsigned upload preset
4. Update `.env`:

```bash
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
```

### Option 2: Base64 (Default)

Images are stored as base64 strings if Cloudinary is not configured.
Good for testing, not recommended for production.

## 📁 Project Structure

```
haoxin-neon/
├── src/
│   ├── components/     # React components
│   ├── context/        # ListingsContext with Neon integration
│   ├── lib/
│   │   ├── neon.ts              # Neon database client
│   │   └── cloudinary-storage.ts # Image upload utilities
│   └── pages/          # Page components
├── neon-schema.sql     # Database schema
├── MIGRATION_GUIDE.md  # Detailed migration docs
└── .env.example        # Environment template
```

## 🔧 Technology Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Neon PostgreSQL (via HTTP API)
- **Storage:** Cloudinary (optional)
- **Build:** Vite + Bun
- **Routing:** React Router
- **State:** React Context API

## 📚 Documentation

- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Detailed migration from Supabase
- [neon-schema.sql](./neon-schema.sql) - Database schema

## 🚀 Deployment

### Deploy to Zeabur (Recommended)

**Quick Deploy (10 minutes):**

1. Push code to GitHub
2. Go to [zeabur.com](https://zeabur.com) and sign in
3. Create new project → Add Service → Git
4. Select your repository
5. Add environment variables in Variables tab:
   - `VITE_DATABASE_URL` (required)
   - `VITE_CLOUDINARY_CLOUD_NAME` (optional)
   - `VITE_CLOUDINARY_UPLOAD_PRESET` (optional)
6. Redeploy if needed
7. Get your free `*.zeabur.app` domain

**📖 Detailed Guide:** See [ZEABUR_DEPLOYMENT.md](./ZEABUR_DEPLOYMENT.md)

**✅ Checklist:** See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

### Deploy to Netlify/Vercel

1. Build the project:
```bash
bun run build
```

2. Deploy the `dist` folder

3. Add environment variables in your hosting platform:
   - `VITE_DATABASE_URL`
   - `VITE_CLOUDINARY_CLOUD_NAME` (optional)
   - `VITE_CLOUDINARY_UPLOAD_PRESET` (optional)

## 🆘 Support

For issues or questions:
- Check [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed documentation
- Review the `.env.example` for configuration options
- Ensure your Neon database is properly configured

## 📝 License

Private project for Haoxin Listings.

---

**Admin Password:** `haoxin2026`
