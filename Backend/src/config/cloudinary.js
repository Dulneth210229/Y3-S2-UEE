const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || '123',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'abc'
});

const uploadImage = async (filePath, folder = 'rural-jobs') => {
  const res = await cloudinary.uploader.upload(filePath, {
    folder,
    transformation: [{ width: 600, height: 600, crop: 'limit' }]
  });
  return { url: res.secure_url, publicId: res.public_id };
};

module.exports = { cloudinary, uploadImage };
