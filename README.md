# LASU Anonymous Feedback System - Next.js

This is a Next.js application for anonymous feedback submission and management.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Anonymous feedback submission
- Admin dashboard for feedback management
- Responsive design with Tailwind CSS
- TypeScript support

## Project Structure

```
app/
├── admin/
│   ├── dashboard/page.tsx
│   └── login/page.tsx
├── components/
├── lib/
│   ├── data/
│   └── types/
├── globals.css
├── layout.tsx
└── page.tsx
```

## Build

To create a production build:

```bash
npm run build
npm start
```