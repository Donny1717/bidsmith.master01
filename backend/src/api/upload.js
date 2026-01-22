/**
 * Helper utilities for handling uploaded files.
 * Routes are defined in server.js; this module centralizes any future processing.
 */

function summarizeUploads(files = []) {
  return files.map(file => ({
    name: file.originalname,
    size: file.size,
    type: file.mimetype
  }));
}

module.exports = {
  summarizeUploads
};
