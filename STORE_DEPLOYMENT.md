# Shipping 180° News to Google Play & the App Store

Status: the product is a **fully responsive web app + installable PWA**. The PWA
can be installed on Android today and added to the iOS home screen. Turning it
into reviewed **native store binaries** is a packaging + payments step, outlined
below.

App IDs (already in `capacitor.config.ts`):

- Android package: `za.co.degrees180.news`
- iOS bundle: `za.co.degrees180.news`

---

## 1. Blocking requirements before submitting

### 1.1 Subscriptions MUST use store billing inside the app (critical)
News All Access is a **digital subscription**.

- **Apple App Store:** in-app purchase is mandatory (StoreKit). You may not
  sell, link to, or steer users toward card/EFT/Google-Pay web checkouts inside
  the iOS app. Approx. 15% (Apple Small Business / year-2) or 30% fee.
- **Google Play:** Google Play Billing is mandatory for digital subscriptions
  distributed on Play (approx. 15–30%).

Recommended implementation: **[RevenueCat](https://www.revenuecat.com)**
(one abstraction over StoreKit + Play Billing). Map the R99 product:

| Product id              | Price          | Entitlement            |
|-------------------------|----------------|------------------------|
| `all_access_monthly`    | R99.99/mo (incl. VAT where applicable) | All Access (7-day intro offer) |

Configure a 7-day free-trial **intro offer** in App Store Connect and Play
Console. Verify entitlement server-side by sending the store receipt/token to
the backend (mirrors the existing subscription cookie model).

Your **website** checkout keeps card / EFT / debit / Google Pay for browser
purchases — that's allowed; the restriction is only inside the iOS/Android app.

### 1.2 Payments are currently simulated
The trial/R99 flow in the repo is a demo (no PSP). Before launch either wire
RevenueCat (apps) or a SA PSP for the web, e.g. **Peach Payments, PayFast,
Stitch, or PayGate**; support 3-D Secure and PCI-compliant hosted fields.

### 1.3 Accounts required
- Apple Developer Program — **US$99/year**; an Organisation enrolment needs a
  **D-U-N-S number**, legal entity, and Apple ID with 2FA.
- Google Play Console — **US$25 once**; complete the organisation, app privacy
  and data-safety forms.

---

## 2. Build the app

The site is server-rendered (SSR). Two options:

### Option A — Hosted shell (recommended, fastest)
The native app is a Capacitor shell that loads the deployed HTTPS site; news,
lottery, video and subscription APIs keep working unchanged.

```bash
npm i
# Host the web app somewhere with HTTPS, then point the shell at it:
#   set `server.url` in capacitor.config.ts to https://your-domain
npm run sync:android
npm run open:android   # Android Studio -> Build -> Generate Signed AAB
npx cap add ios && npx cap sync ios
npx cap open ios       # Xcode -> Archive/Upload
```

### Option B — Bundled static export
```bash
npm run export:static   # produces ./out (configure dynamic routes to pre-render)
npx cap add android && npx cap add ios && npx cap sync
```
Because the news/lottery/markets are dynamic, Option A is the better fit.

---

## 3. Store assets checklist

Provided in `public/icons/`:

- App icons 192/512 + maskable, Apple 180, favicons
- Apple splash (add more device sizes with `@capacitor/assets`)
- Play feature graphic 1024×500

Still needed:

- Screenshots for: Android phone (2–8), 7" & 10" tablet; iOS 6.9" & 6.5",
  iPad. Capture home, Live Wire, an article, Watch, Lotto, Premium.
- Descriptions (en-ZA), a privacy-policy URL (`/privacy`) and
  terms URL (`/terms`) — both already exist.
- Content rating questionnaire; category **News & Magazines**.
- Reviewer demo account for All Access (provide a working login).
- Data Safety (Play) / App Privacy (Apple): disclose email, account
  registration, payments, usage/diagnostics, advertising IDs where used.

---

## 4. Compliance notes for reviewers

- Provide an account-deletion path (Apple/Google require it). The web app has
  `/account`; expose "Delete my data" via the privacy email and, in a future
  iteration, a one-tap control.
- Third-party embeds (YouTube, podcast hosts) open within the app — keep
  attribution and links to originals.
- News apps on iOS: avoid making the binary a thin website wrapper in the
  reviewer's eyes — the bottom tab bar, Watch/Listen, Lotto, Markets and
  native IAP provide that; consider push notifications (OneSignal/FCM).
- Gambling-adjacent features (Lotto): present results, not real-money betting.

---

## 5. PWA (works today, no store needed)

- Manifest: `src/app/manifest.ts`
- Service worker / offline: `public/sw.js`, `public/offline.html`
- Install prompt: `src/components/pwa/InstallPrompt.tsx`

Android Chrome shows an install banner automatically; iOS shows
"Share → Add to Home Screen". This is also the fastest path to a
Google Play listing via a **Trusted Web Activity (Bubblewrap/PWA Builder)**
if you do not adopt Play Billing for digital subscriptions.

---

## 6. Suggested launch sequence

1. Deploy the web app to HTTPS hosting; verify `/privacy`, `/terms`, manifest
   and service worker pass Lighthouse PWA checks.
2. Create RevenueCat products + 7-day intro offers and wire entitlements.
3. `npx cap` shells → signed `.aab` (Play Internal Testing) and TestFlight.
4. Run closed tracks, fix review issues, complete privacy forms.
5. Production release with screenshots and listing copy.
