# JhatkaByte Admin Portal

This folder contains the React admin portal for orders, customers, franchises, products, delivery boys, invoices, and summaries.

## Before Deployment

1. Deploy the backend first.

   The admin portal needs the backend API URL before it is built.

2. Configure environment variables.

   Copy `.env.example` and set production values in your hosting provider. Do not commit `.env`.

   Required values:

   ```env
   REACT_APP_API_BASE_URL=https://your-backend-domain.com
   REACT_APP_ADMIN_API_BASE_URL=https://your-backend-domain.com/admin
   REACT_APP_UPLOAD_URL=https://your-backend-domain.com/uploads
   REACT_APP_ADMIN_BASENAME=
   ```

   If the admin portal is hosted under a sub-path, set the basename:

   ```env
   REACT_APP_ADMIN_BASENAME=/admin
   ```

3. Make sure backend CORS allows the admin domain.

   In the backend env, include the deployed admin URL:

   ```env
   CORS_ORIGINS=https://your-admin-domain.com
   ```

4. Install dependencies.

   ```bash
   npm ci
   ```

5. Build the admin portal.

   ```bash
   npm run build
   ```

6. Check the main admin routes after deployment.

   ```text
   /
   /dashboard
   /order/list
   /customers/list
   /franchise/list
   /product/list
   ```

## Docker Deployment

The Dockerfile builds the React app and serves it with nginx.

Build with direct backend URLs:

```bash
docker build \
  --build-arg REACT_APP_API_BASE_URL=https://your-backend-domain.com \
  --build-arg REACT_APP_ADMIN_API_BASE_URL=https://your-backend-domain.com/admin \
  --build-arg REACT_APP_UPLOAD_URL=https://your-backend-domain.com/uploads \
  -t jhatkabyte-admin .
```

Run:

```bash
docker run -p 8080:8080 jhatkabyte-admin
```

If the admin container should proxy API calls through nginx, build with the default `/api`, `/admin-api`, and `/uploads` values and set:

```env
BACKEND_ORIGIN=http://your-backend-service:3000
NGINX_PORT=8080
```

## Useful Commands

```bash
npm start
npm run build
```

## Final Checklist

- Backend is already deployed and healthy.
- Admin env points to the correct backend.
- Backend `CORS_ORIGINS` includes the admin domain.
- `npm run build` passes.
- Login works with the admin user created from the backend.
- Order invoice, thermal print, and summary download work in the deployed admin portal.
