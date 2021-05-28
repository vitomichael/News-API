// https://github.com/expressjs/multer
const multer = require("multer");
const path = require("path");
const { unlinkAsync } = require("../helpers/deleteFile");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/thumbnail/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const checkFileType = (file, cb) => {
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb("Extension not allowed", false);
  }
};

const upload = (req, res, next) => {
  multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  }).fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ])(req, res, (err) => {
    if (err) {
      if (req.files.thumbnail) {
        req.files.thumbnail.forEach(async (element) => {
          await unlinkAsync(element.path); //ngapus file, element.path lokasi filenya
        });
      }

      if (err.code) {
        return res.rest.notAcceptable(err.code);
      }

      return res.rest.notAcceptable(err);
    } else {
      next();
    }
  });
};

module.exports = upload;
