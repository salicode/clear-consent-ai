/**
 * Extraction structure
 * ---------------------
 * This is the contract between the policy text and everything the interface
 * shows about it. In Week 2 this exact shape is what the server-side model
 * endpoint must return — nothing upstream or downstream of the model should
 * need to change.
 *
 * Hard rule: any field the source text does not explicitly state must be
 * the literal string "Not stated". The model is never allowed to infer,
 * estimate, or default a value, and it must never produce a legal
 * conclusion (e.g. "this complies with GDPR"). This file only defines the
 * shape; enforcing the rule is a prompting/validation concern for Week 2.
 *
 * @typedef {"Not stated"} NotStated
 *
 * @typedef {Object} SourceSpan
 * @property {number} start - character offset into the original policy text
 * @property {number} end   - character offset into the original policy text
 * @property {string} quote - the exact substring policyText.slice(start, end),
 *                            stored redundantly so the UI never has to trust
 *                            the offsets alone
 *
 * @typedef {Object} ExtractedItem
 * @property {string} id                    - stable id, e.g. "item-1"
 * @property {string} category              - data category, e.g. "Email address"
 * @property {string | NotStated} purpose    - why it is collected
 * @property {string | NotStated} recipient  - who it is shared with
 * @property {string | NotStated} retention  - how long it is kept
 * @property {SourceSpan | null} sourceSpan  - supporting text for `category`
 *                                             (null only if category itself
 *                                             could not be tied to a span)
 * @property {"extracted" | "corrected"} status - whether a user has flagged
 *                                             and corrected this item
 *
 * @typedef {Object} PolicyExtraction
 * @property {string} policyId
 * @property {string} policyText            - the raw pasted text
 * @property {ExtractedItem[]} items
 * @property {number} generatedAtMs
 */

// Nothing to export at runtime yet — this file is the schema definition
// deliverable for Week 1. Week 2's server endpoint will validate its
// response against this same shape before it reaches the UI.
export const EXTRACTED_ITEM_FIELDS = [
  "category",
  "purpose",
  "recipient",
  "retention",
];

export const NOT_STATED = "Not stated";
