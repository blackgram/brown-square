# Admin + Firebase + Paystack

## Local defaults

Leave providers on `local` in `.env` to run the public site without Firebase:

```
BLOG_PROVIDER=local
NEXT_PUBLIC_COMMERCE_PROVIDER=local
SITE_PROVIDER=local
```

Checkout still uses Paystack when `PAYSTACK_SECRET_KEY` is set, even with a local catalog.

## Firebase mode

1. Create a Firebase project with Auth (email/password) and Firestore.
2. Deploy [`firestore.rules`](firestore.rules) (client writes denied; server Admin SDK only).
3. Copy web config into `NEXT_PUBLIC_FIREBASE_*`.
4. Create a service account and set `FIREBASE_ADMIN_*` (escape private key newlines as `\n`).
5. Set providers to `firebase` (commerce may be `firebase` or `paystack`).
6. Seed content and bootstrap super admin:

```bash
SUPER_ADMIN_EMAIL=you@example.com SUPER_ADMIN_PASSWORD='...' pnpm seed
```

7. Sign in at `/admin/login`.

## Image uploads (Vercel Blob)

Admin post/product image uploads (`/api/admin/upload`) use Vercel Blob instead of Firebase Storage (no Blaze plan needed).

1. In the Vercel dashboard: Storage -> Create Database -> Blob.
2. Connect the store to this project; Vercel injects `BLOB_READ_WRITE_TOKEN` into Production/Preview env vars automatically.
3. For local dev, copy `BLOB_READ_WRITE_TOKEN` from the store's ".env.local" tab into your `.env.local`.

## Permissions

- **Super admin:** full access; only role that can manage users.
- **Admin:** assignable `editor`, `product_manager`, `site_manager`.

## Paystack

Set `PAYSTACK_SECRET_KEY`, `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`, and `NEXT_PUBLIC_SITE_URL`.  
Webhook URL: `https://your-domain/api/paystack/webhook`  
Callback: `/checkout/success`
