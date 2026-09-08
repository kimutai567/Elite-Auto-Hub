# Elite Auto Hub

Elite Auto Hub is a React and Vite storefront for imported vehicle accessories. Customers can browse parts, view fitment and color details, request custom parts, place orders, and track order updates.

## Run Locally

Install dependencies:

```powershell
npm.cmd install
```

Start the development server:

```powershell
npm.cmd run dev
```

Open the storefront at `http://127.0.0.1:5173/`.

## Admin Dashboard

Open `http://127.0.0.1:5173/admin`.

The default development password is:

```text
elite2025
```

For a different password, create a `.env` file with:

```text
VITE_ADMIN_PASSWORD=your-password
```

Do not commit `.env` files or real production credentials.

## Features

- Product catalog with category filters and search
- Product color, vehicle fitment, notes, and image galleries
- Multiple image uploads for catalog items
- Customer quote cart and order placement
- Customer order tracking by email
- Custom part requests for unavailable products
- Admin responses for availability, advice, price, and sourcing timelines
- Admin order status tracking
- Local browser storage for demo data

## Production Build

```powershell
npm.cmd run build
```

The production files are generated in `dist/` and are excluded from Git.

## GitHub

Repository: https://github.com/kimutai567/Elite-Auto-Hub

Push local changes:

```powershell
git add .
git commit -m "Describe your change"
git push
```
