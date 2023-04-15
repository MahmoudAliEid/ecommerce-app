const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(__dirname, "../images");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = Date.now() + "-" + file.originalname.replace(/\s/g, "");
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
