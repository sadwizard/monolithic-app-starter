var fs = require('fs');
var config = require('../config');
var cloudinary = require('cloudinary');

cloudinary.config(config.cloudinary);

function imageUpload(file, cb, preset) {
  try {
    if (!file || typeof file !== 'object' || !file.path) {
      return cb(new Error('Object doesnt match with cloudinary image object!'));
    }

    cloudinary.v2.uploader.upload(`./${file.path}`, { upload_preset: preset }, (err, result) => {
      if (err) {
        return cb(new Error(err.message));
      }

      fs.unlink(`./${file.path}`, (err) => {
        if (err) return cb(new Error('Local file hasn\'t been removed!'));
        
        if (result.public_id) cb(null, result);
      });
    });
  } catch(e) {
    cb(e);
  }
}

function imageRemove(public_id, cb) {
  try {
    if (!public_id) {
      return cb(new Error('public_id is required!'));
    }

    cloudinary.v2.uploader.destroy(public_id, cb);
  } catch(e) {
    cb(e);
  }
}

function imageUpdate(newFile, oldFile, cb, preset) {
  try {
    if (!newFile || !oldFile) return cb(new Error('Оldfile, newfile params required!'));

    imageRemove(oldFile.public_id, (err, res) => {
      if (err) return cb(new Error(err.message));

      imageUpload(newFile, cb, preset);
    });
  } catch (e) {
    console.error(e);
    cb(e);
  }
}

exports.default = {
  imageUpload,
  imageRemove,
  imageUpdate,
};