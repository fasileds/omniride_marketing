# OmniRide Marketing Site — Setup Guide

## 1. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 2. Supabase Database

Run `supabase/schema.sql` in your Supabase SQL editor. This creates:
- `waitlist` table with RLS (public inserts, authenticated reads)
- `blog_posts` table with RLS (public reads of published posts, authenticated full access)
- Auto-updating `updated_at` trigger
- Indexes for performance

## 3. Supabase Auth

Create an admin user in Supabase Authentication > Users > Add User.
This account is used to log in at `/admin/login`.

## 4. Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 5. Deploy to Vercel

1. Push to GitHub
2. Import the repo in Vercel
3. Add the three environment variables in Vercel Project Settings
4. Deploy — that's it

## File structure

```
app/
  (public)/          # Public pages (Home, Blog, About, etc.)
  admin/             # Protected admin section
  api/               # API routes (waitlist, blog CRUD)
components/
  layout/            # Navbar, Footer
  home/              # All home page sections
  admin/             # Admin sidebar, stat card, Tiptap editor
lib/supabase/        # Client, server, service, route helpers
types/index.ts       # All TypeScript interfaces
supabase/schema.sql  # Database schema to run in Supabase
middleware.ts        # Admin route protection
```

## Note on Next.js version

The project uses Next.js 14.2.18 as specified. A newer patch with security fixes is available at 14.2.29+. Consider upgrading before going to production.
