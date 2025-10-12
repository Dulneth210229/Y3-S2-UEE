const twilio = require('twilio');

function getClient() {
  if (!process.env.TWILIO_SID || !process.env.TWILIO_TOKEN) return null;
  return twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
}

async function sendSMS(to, body) {
  const client = getClient();
  if (!client) {
    console.log(`[SMS noop] to=${to} body=${body}`);
    return { sid: 'noop' };
  }
  const from = process.env.TWILIO_FROM;
  return client.messages.create({ from, to, body });
}

module.exports = { sendSMS };
