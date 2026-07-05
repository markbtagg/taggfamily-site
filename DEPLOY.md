# Deploying taggfamily.ca

The site is a static Astro build. Hosting is **Cloudflare Pages** (free), and DNS moves
from **GoDaddy** to **Cloudflare**. These steps need account access, so they're done by
hand once.

## 1. Connect the repo to Cloudflare Pages

1. Sign in at <https://dash.cloudflare.com> (create a free account if needed).
2. **Workers & Pages → Create → Pages → Connect to Git**.
3. Authorize GitHub and pick **markbtagg/taggfamily-site**.
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. **Save and Deploy.** After ~1 minute you get a live URL like
   `https://taggfamily-site.pages.dev` — open it and confirm the site looks right.
   Every future `git push` to `main` auto-builds and deploys.

## 2. Add the domain to Cloudflare (moves DNS off GoDaddy)

1. In the Cloudflare dashboard: **Add a site** → enter `taggfamily.ca` → choose the
   **Free** plan.
2. Cloudflare scans existing DNS and shows **two nameservers** assigned to you, e.g.
   `xxx.ns.cloudflare.com` and `yyy.ns.cloudflare.com`. Keep this tab open.

## 3. Point GoDaddy at Cloudflare's nameservers

1. Sign in at <https://dcc.godaddy.com/control/portfolio> (My Products → Domains).
2. Open **taggfamily.ca → Manage DNS → Nameservers → Change**.
3. Choose **"I'll use my own nameservers"** and enter the **two Cloudflare nameservers**
   from step 2. Save.
4. Back in Cloudflare, wait until the zone status shows **Active** (usually minutes, up to
   ~24 h). This moves *DNS only* — the domain stays registered at GoDaddy.

## 4. Attach the custom domain to the Pages project

1. **Workers & Pages → taggfamily-site → Custom domains → Set up a custom domain.**
2. Add **`taggfamily.ca`** — Cloudflare auto-creates the DNS record (apex via CNAME
   flattening) and provisions an SSL certificate.
3. Add **`www.taggfamily.ca`** the same way (Cloudflare sets up the redirect/record).

## 5. Verify

- `https://taggfamily.ca` loads with a valid certificate (padlock).
- `https://www.taggfamily.ca` resolves/redirects.
- All six project cards render; the four "View source" links open the right GitHub repos.

## Updating the site later

- Edit or add a markdown file in `src/content/projects/` (or any page), commit, and
  `git push`. Cloudflare Pages rebuilds and redeploys automatically.
- Local preview: `npm install` then `npm run dev` → <http://localhost:4321>.
