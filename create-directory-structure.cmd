@echo off
echo Creating directory structure for minimal Next.js template...

REM Create app directory structure
mkdir app
mkdir app\auth
mkdir app\auth\login
mkdir app\auth\register
mkdir app\dashboard
mkdir app\profile
mkdir app\api
mkdir app\api\auth
mkdir app\api\auth\callback

REM Create component directories
mkdir components
mkdir components\ui

REM Create lib directory
mkdir lib

REM Create types directory
mkdir types

REM Create public directory
mkdir public

REM Create empty files
type nul > .env.local
type nul > app\globals.css
type nul > app\layout.tsx
type nul > app\page.tsx

type nul > app\auth\login\page.tsx
type nul > app\auth\register\page.tsx

type nul > app\dashboard\page.tsx
type nul > app\profile\page.tsx

type nul > app\api\auth\callback\route.ts

type nul > components\auth-form.tsx
type nul > components\header.tsx
type nul > components\theme-provider.tsx
type nul > components\theme-toggle.tsx

type nul > lib\auth.ts
type nul > lib\supabase.ts
type nul > lib\utils.ts

type nul > types\index.ts

type nul > middleware.ts
type nul > supabase-schema.sql

echo Directory structure created successfully!
echo You can now copy and paste the code into these files.