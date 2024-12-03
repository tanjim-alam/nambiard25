// // pages/api/upload.js
// import multer from 'multer';
// import nextConnect from 'next-connect';

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: './public/uploads', // Set upload directory
//         filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
//     }),
// });

// const handler = nextConnect();

// handler.use(upload.single('file'));

// handler.post((req, res) => {
//     if (req.file) {
//         const fileUrl = `/uploads/${req.file.filename}`;
//         res.status(200).json({ url: fileUrl });
//     } else {
//         res.status(400).json({ message: 'File upload failed' });
//     }
// });

// export default handler;
