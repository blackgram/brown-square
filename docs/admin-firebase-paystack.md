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

1. Create a Firebase project with Auth (email/password), Firestore, and Storage.
2. Deploy [`firestore.rules`](firestore.rules) and [`storage.rules`](storage.rules) (client writes denied; server Admin SDK only).
3. Copy web config into `NEXT_PUBLIC_FIREBASE_*`.
4. Create a service account and set `FIREBASE_ADMIN_*` (escape private key newlines as `\n`).
5. Set providers to `firebase` (commerce may be `firebase` or `paystack`).
6. Seed content and bootstrap super admin:

```bash
SUPER_ADMIN_EMAIL=you@example.com SUPER_ADMIN_PASSWORD='...' pnpm seed
```

7. Sign in at `/admin/login`.

## Permissions

- **Super admin:** full access; only role that can manage users.
- **Admin:** assignable `editor`, `product_manager`, `site_manager`.

## Paystack

Set `PAYSTACK_SECRET_KEY`, `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`, and `NEXT_PUBLIC_SITE_URL`.  
Webhook URL: `https://your-domain/api/paystack/webhook`  
Callback: `/checkout/success`
