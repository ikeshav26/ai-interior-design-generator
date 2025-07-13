import {v2 as cloudinary} from 'cloudinary';
import e from 'express';

cloudinary.config({
  cloud_name: "ducvkar80",
    api_key: "197243685971665",
    api_secret: "4RmEZoQlm_dOnMBw1lbTLttGH8w",
    secure: true
});

export default cloudinary;