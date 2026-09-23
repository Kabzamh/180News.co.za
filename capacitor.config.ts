import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Native shell for app stores. Build the Next.js PWA first, then sync:
 *   1. npm run build && npm run export:static   (or point server.url at hosting)
 *   2. npx cap add android ; npx cap add ios
 *   3. npx cap sync
 * For a hosted web app (recommended for this dynamic news service), set
 * server.url to your production URL and the shell simply loads it.
 */
const config: CapacitorConfig = {
  appId: "za.co.degrees180.news",
  appName: "180° News",
  webDir: "out",
  backgroundColor: "#0c1870",
  android: {
    allowMixedContent: false,
    backgroundColor: "#0c1870",
  },
  ios: {
    contentInset: "always",
    backgroundColor: "#0c1870",
    scheme: "180news",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: "#0c1870",
      showSpinner: false,
    },
    StatusBar: {
      style: "LIGHT",
      backgroundColor: "#8c0e0e",
    },
  },
};

export default config;
