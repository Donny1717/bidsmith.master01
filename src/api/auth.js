/**
 * Firebase Auth middleware and session helpers.
 * Ensures protected endpoints validate Firebase ID tokens and optionally enforce active subscriptions.
 */
import { auth, getUserProfile } from '../lib/firebase.js';

const BEARER_PREFIX = 'Bearer ';

/**
 * Extract a Firebase ID token from Authorization header or session cookie.
 */
function extractToken(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader?.startsWith(BEARER_PREFIX)) {
    return authHeader.slice(BEARER_PREFIX.length).trim();
  }

  const cookies = req.headers.cookie || '';
  const sessionCookie = cookies
    .split(';')
    .map(part => part.trim())
    .find(part => part.startsWith('session='));

  if (sessionCookie) {
    return decodeURIComponent(sessionCookie.split('=')[1]);
  }

  return null;
}

/**
 * Attach user context if a valid token is present; otherwise continue.
 */
export async function optionalAuth(req, res, next) {
  const token = extractToken(req);
  if (!token) return next();

  try {
    const decoded = await auth.verifySessionCookie(token, true).catch(() => auth.verifyIdToken(token, true));
    const profile = await getUserProfile(decoded.uid);
    req.user = { ...decoded, profile };
    return next();
  } catch (error) {
    console.warn('Optional auth failed', error.message);
    return next();
  }
}

/**
 * Require authentication and attach user profile.
 */
export async function requireAuth(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = await auth.verifySessionCookie(token, true).catch(() => auth.verifyIdToken(token, true));
    const profile = await getUserProfile(decoded.uid);

    req.user = { ...decoded, profile };
    return next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Ensure the authenticated user has an active subscription.
 */
export function requireActiveSubscription(req, res, next) {
  if (!req.user?.profile) {
    return res.status(403).json({ error: 'Subscription required' });
  }

  const status = req.user.profile.subscription_status;
  if (status && ['active', 'trialing'].includes(status)) {
    return next();
  }

  return res.status(402).json({ error: 'Subscription not active' });
}

/**
 * Create a signed session cookie from an ID token.
 */
export async function createSessionCookie(idToken, res) {
  const expiresIn = 7 * 24 * 60 * 60 * 1000; // 7 days
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
  res.cookie('session', sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });
  return sessionCookie;
}

/**
 * Clear the session cookie for logout flows.
 */
export function clearSessionCookie(res) {
  res.clearCookie('session', { path: '/' });
}
