const multer = require("multer");

const upload = multer({ dest: "public/uploads" });


const uploadSingle = upload.single("photo");

module.exports = {
    uploadSingle
}