# Leonida Index — start here

Fan site starter. Not affiliated with Rockstar / Take-Two.

## 1. Buy a domain (you do this)

1. Open Porkbun, Cloudflare Registrar, or Namecheap.
2. Search one name. Buy only one.
   Good patterns: leonidaindex.com · gta6index.com · viceindex.com
3. Leave nameservers on the registrar for now. You will point them at Vercel in step 2.

Do not buy 5 domains.

## 2. Put this code on the internet

On your computer:

```bash
# if you copied this folder
cd leonida-index
npm install
npm run dev
```

Open http://localhost:3000 and tap Map on your phone (same Wi‑Fi) or just use the laptop.

Then ship it:

1. Create a free GitHub repo. Upload this folder (do not upload node_modules).
2. Go to https://vercel.com → Import the repo → Deploy.
3. Vercel → Project → Settings → Domains → add the domain you bought.
4. Vercel will show DNS records. At your registrar, add the A / CNAME they list.
5. Wait 5–30 minutes. Open https://yourdomain.com on your phone.

If anything fails, the Vercel URL (something.vercel.app) is already good enough to keep building.
