const { sendSMS } = require('../services/smsService');

exports.send = async (req, res, next) => {
  try {
    const { to, body } = req.body;
    if (!to || !body) return next(Object.assign(new Error('Missing to/body'), { status: 400 }));
    const r = await sendSMS(to, body);
    res.json({ success: true, data: r });
  } catch (e) { next(e); }
};
