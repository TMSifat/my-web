This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Railway

This project is configured for [Railway](https://railway.app/) using `railway.json`. It uses **Nixpacks** for automatic build detection.

### Prerequisites

1.  **Railway CLI**: Recommended for local deployment and linking.
    ```bash
    npm i -g @railway/cli
    ```
2.  **Supabase Project**: Ensure you have a Supabase project set up.

### Deployment Steps

1.  **Link your repo**:
    - Connect your GitHub repository to a new Railway project.
2.  **Configure Environment Variables**:
    In the Railway dashboard, go to **Variables** and add:
    - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
3.  **Automatic Build**:
    Railway will automatically detect the Next.js project, build it using `npm run build`, and start it.
4.  **Health Check**:
    The deployment includes a health check at `/api/health`.

### Local Testing with Railway

To test with production variables locally:
```bash
railway run npm run dev
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
