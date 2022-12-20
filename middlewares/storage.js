const multer = require("multer");
const crypto = require("crypto");
const BaseError = require("../errors");
const sharp = require('sharp');


// const multerStorageDisk = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/uploads")
//     },
//     filename: (req, file, cb) => {
//         const extension = file.mimetype.split("/")[1];
//         const randomStringName = crypto.randomBytes(8).toString("hex") + "." + extension;
//         console.log(randomStringName);
//         cb(null, randomStringName);
//     }
// })


const multerStorageMemory = multer.memoryStorage();


const multerFilterPhoto = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new BaseError("file must be image format"), false)
    }
}

// const upload = multer({ dest: "public/uploads" });
//const uploadSingle = upload.single("photo");

const uploadSinglePhoto = multer({
    //storage: multerStorageDisk,
    storage: multerStorageMemory,
    fileFilter: multerFilterPhoto
}).single("photo")


const uploadMultiPhoto = multer({
    storage: multerStorageMemory,
    fileFilter: multerFilterPhoto
}).array("photo", 3)

const resizeImages = async (req, res, next) => {
    let output = [];
    if (req.file) {
        let file = req.file;
        const extension = file.mimetype.split("/")[1];
        const randomStringName = crypto.randomBytes(8).toString("hex") + "." + extension;
        const outputPath = `public/uploads/${randomStringName}`
        await sharp(req.file.buffer)
            .resize(400, 300)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(outputPath)
        output.push(outputPath);
    }

    if (req.files) {
        for (let file of req.files) {
            const extension = file.mimetype.split("/")[1];
            const randomStringName = crypto.randomBytes(8).toString("hex") + "." + extension;
            const outputPath = `public/uploads/${randomStringName}`
            await sharp(file.buffer)
                .resize(400, 300)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(outputPath)
            output.push(`${req.protocol}://${req.hostname}/${outputPath}`);
        }
    }
    req.media = output;
    next();
}

module.exports = {
    uploadSinglePhoto,
    uploadMultiPhoto,
    resizeImages
}