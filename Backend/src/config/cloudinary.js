import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const certificateStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'rural-jobs/education-certificates',
    resource_type: 'image', // use 'auto' if you want to allow PDFs too
    format: undefined
  })
});

export { cloudinary };
