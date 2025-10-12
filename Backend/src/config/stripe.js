const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_xxx');

const JOB_POST_PRICE_CENTS = 29900; // adjust as needed; currency USD for testing
const CURRENCY = 'usd';

module.exports = { stripe, JOB_POST_PRICE_CENTS, CURRENCY };
