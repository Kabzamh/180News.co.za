# 180 Degrees News

Online South African news bulletin built with Next.js, PostgreSQL and Drizzle ORM.

## Vercel deployment

The repository can use either `src/app` or root `app` layouts. The TypeScript alias supports both.

Set these environment variables in Vercel before deployment:

- `DATABASE_URL` — hosted PostgreSQL connection string (Neon/Vercel Postgres/Supabase)
- `ADMIN_EMAIL` — staff login email
- `ADMIN_PASSWORD` — strong staff password
- `NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID` — optional until Google Pay goes live
- `PAYFAST_MERCHANT_ID` or `STRIPE_SECRET_KEY` — required before accepting real payments

Do not commit `.env` or `.env.local`.

Apply the schema to production after setting `DATABASE_URL`:

```bash
npx drizzle-kit push
```

Vercel build command:

```bash
npx next build
```

## Local checks

```bash
npx next typegen
npm exec tsc -- --noEmit --pretty false
npm run lint
npm run build
```
