import { NOT_STATED } from "./extractionSchema";

/**
 * Two sample passages, deliberately written so one is fairly complete and
 * the other is missing a field — the retention period for passage B is
 * never mentioned, so its extraction should show "Not stated" rather than
 * a guess. This is the case used in the final demo to prove the tool
 * doesn't invent detail.
 *
 * These demo `items` arrays stand in for the model this week. In Week 2
 * they're replaced by whatever the server endpoint returns, validated
 * against the same shape.
 */
export const SAMPLE_POLICIES = [
  {
    id: "policy-a",
    label: "Sample A — Fitness app",
    text: `We collect your email address and full name when you create an account, so we can send you order confirmations and account security alerts. Your workout data, including GPS location during outdoor sessions, is collected to power the route-history feature and is shared with our mapping provider, GeoTrail Inc., to render your routes. Location data is retained for 18 months, after which it is deleted. We do not sell your name or email address to third parties.`,
    items: [
      {
        id: "a-1",
        category: "Email address",
        purpose: "Send order confirmations and account security alerts",
        recipient: NOT_STATED,
        retention: NOT_STATED,
        status: "extracted",
      },
      {
        id: "a-2",
        category: "Full name",
        purpose: "Send order confirmations and account security alerts",
        recipient: NOT_STATED,
        retention: NOT_STATED,
        status: "extracted",
      },
      {
        id: "a-3",
        category: "GPS location (outdoor sessions)",
        purpose: "Power the route-history feature",
        recipient: "GeoTrail Inc. (mapping provider)",
        retention: "18 months",
        status: "extracted",
      },
    ],
  },
  {
    id: "policy-b",
    label: "Sample B — Budgeting app",
    text: `To provide budgeting insights, the app reads your linked bank transaction history. Transaction data is processed by our analytics partner, Ledgerly Analytics, to categorize spending. We also collect your device's advertising identifier for the purpose of measuring ad campaign performance.`,
    items: [
      {
        id: "b-1",
        category: "Bank transaction history",
        purpose: "Provide budgeting insights; categorize spending",
        recipient: "Ledgerly Analytics (analytics partner)",
        retention: NOT_STATED,
        status: "extracted",
      },
      {
        id: "b-2",
        category: "Advertising identifier",
        purpose: "Measure ad campaign performance",
        recipient: NOT_STATED,
        retention: NOT_STATED,
        status: "extracted",
      },
    ],
  },
];
