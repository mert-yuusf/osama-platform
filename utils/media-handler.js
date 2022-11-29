const multer = require("multer");
const BaseError = require("../errors");

// 1-multer configuration
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, "../public/uploads"));
//     },
//     filename: (req, file, cb) => {
//         const randHex = crypto.randomBytes(16).toString("hex");
//         const ext = file.originalname.split(".")[1];
//         const fileName = `${randHex}-${Date.now()}.${ext}`;
//         cb(null, fileName);
//     },
// });

const multerStorage = multer.memoryStorage();

// 2-multer filter files types
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new BaseError.Bad_Request("Please select an image"), false);
  }
};

// 3-create multer uploader
const uploader = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// 4-create uploader middleware
const uploadMediaMiddleware = uploader.fields([
  { name: "media", maxCount: 10 },
]);

module.exports = {
  uploadMediaMiddleware,
};
