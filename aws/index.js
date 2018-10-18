const AWS = require('aws-sdk');
const sharp = require('sharp');
const { accessKeyId, secretAccessKey } = require('./credentials');
AWS.config.update({ accessKeyId, secretAccessKey });
const s3 = new AWS.S3();
const Bucket = "bang-aa";

module.exports = {
  put: image => {
    if (!image) return;
    return new Promise((resolve, reject) => {
      sharp(image.data)
        .resize({ width: 300 })
        .toBuffer()
        .then(data => {
          let params = {
            Bucket,
            Key: image.name,
            Body: data
          };

          s3.putObject(params, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
    });
  }
}