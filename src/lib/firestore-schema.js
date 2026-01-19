/**
 * Firestore schema definitions for BidSmith ASF.
 * These are JSDoc types to keep runtime JS while providing editor hints.
 */

/**
 * @typedef {Object} UserDoc
 * @property {string} uid
 * @property {string} [email]
 * @property {('active'|'inactive'|'trialing'|'canceled')} [subscription_status]
 * @property {string} [stripe_customer_id]
 * @property {string} [stripe_subscription_id]
 * @property {FirebaseFirestore.Timestamp} [created_at]
 * @property {FirebaseFirestore.Timestamp} [updated_at]
 */

/**
 * @typedef {Object} CompanyDoc
 * @property {string} name
 * @property {string[]} [projects]
 * @property {string[]} [accreditations]
 * @property {string[]} [policies]
 */

/**
 * @typedef {Object} TenderDoc
 * @property {string} tender_id
 * @property {string} [owner_uid]
 * @property {string} [filename]
 * @property {string} [content_type]
 * @property {string} [raw_text]
 * @property {object} [parsed_data]
 * @property {object} [analyzed_data]
 * @property {('uploaded'|'analyzed'|'archived')} [status]
 * @property {FirebaseFirestore.Timestamp} [uploaded_at]
 * @property {FirebaseFirestore.Timestamp} [analyzed_at]
 */

/**
 * @typedef {Object} BidDoc
 * @property {string} bid_id
 * @property {string} tender_id
 * @property {string} [owner_uid]
 * @property {object|string} generated_content
 * @property {object} [analyzed_data]
 * @property {object} [signature]
 * @property {string} [pdf_url]
 * @property {('draft'|'submitted'|'signed')} [status]
 * @property {FirebaseFirestore.Timestamp} [created_at]
 * @property {FirebaseFirestore.Timestamp} [signed_at]
 */

// Export an empty object to make the module valid.
export const FirestoreSchema = {};
