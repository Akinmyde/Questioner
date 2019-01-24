import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'Questioner',
  allowedFormats: ['jpg', 'png', 'jpeg'],
});

const fileFilter = (req, file, cb) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)) {
    req.typeError = 'Only jpeg or png images are allowed!';
    return cb(undefined, false);
  }
  return cb(undefined, true);
};

const cloudinaryUpload = multer({ storage, fileFilter });

const cloudinaryDelete = (publicId) => {
  cloudinary.v2.uploader.destroy(publicId, () => console.log('image deleted'));
};

export { cloudinaryUpload, cloudinaryDelete };
