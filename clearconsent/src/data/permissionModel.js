/**
 * Explicit demonstration permission model.
 *
 * This does not call, read, or control any real service. Toggling an entry
 * here only changes local state and the "what changes" text below it —
 * it exists to demonstrate the concept of a permission dashboard, per the
 * assignment's scope boundary.
 */
export const PERMISSIONS = [
  {
    id: "location-sharing",
    label: "Share precise location",
    description: "Lets the app record GPS location during outdoor sessions.",
    defaultGranted: true,
    whenGranted:
      "Route-history maps are generated from your GPS trail. Location is sent to GeoTrail Inc. and kept for 18 months.",
    whenRevoked:
      "Route-history maps stop generating. No location data is recorded or sent to GeoTrail Inc. going forward.",
  },
  {
    id: "ad-identifier",
    label: "Advertising identifier",
    description: "Lets the app read your device's ad ID.",
    defaultGranted: true,
    whenGranted:
      "Ad campaign performance is measured using your device's advertising identifier.",
    whenRevoked:
      "Ad campaign measurement stops using your device identifier. Ads may become less targeted.",
  },
  {
    id: "transaction-analytics",
    label: "Share transactions with analytics partner",
    description:
      "Lets Ledgerly Analytics process your bank transaction history for spend categorization.",
    defaultGranted: true,
    whenGranted:
      "Transactions are sent to Ledgerly Analytics so spending can be auto-categorized in your budget view.",
    whenRevoked:
      "Transactions are no longer sent to Ledgerly Analytics. Spend categorization switches to manual tagging.",
  },
  {
    id: "marketing-email",
    label: "Marketing emails",
    description: "Lets the app email you about new features and offers.",
    defaultGranted: false,
    whenGranted: "You'll receive periodic emails about new features and offers.",
    whenRevoked: "You will not receive marketing emails. Account and security emails are unaffected.",
  },
];
