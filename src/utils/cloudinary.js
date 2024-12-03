import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dmz316wxm",
    api_key: process.env.CLOUDINARY_API_KEY || "247179179471582",
    api_secret: process.env.CLOUDINARY_API_SECRET || "VSv5o_M_axaKxwz-ktxT-inuoJo",
});

export default async function uploadOnCloudinary(buffer) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }).end(buffer);
    });
}
