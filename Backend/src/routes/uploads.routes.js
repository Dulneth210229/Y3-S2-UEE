
const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const path = require('path');
const fs = require('fs');
const { auth } = require('../middleware/auth');
const { uploadImage } = require('../config/cloudinary');

const upload = multer({ dest: path.join(os.tmpdir(), 'rural-jobs') });

router.post('/image', auth, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) return next(Object.assign(new Error('Missing file'), { status: 400 }));
    const result = await uploadImage(req.file.path, 'rural-jobs');
    // cleanup
    try { fs.unlinkSync(req.file.path); } catch {}
    res.json({ success: true, data: { url: result.url, publicId: result.publicId } });
  } catch (e) { next(e); }
});

module.exports = router;
