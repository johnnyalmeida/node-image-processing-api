import fs from 'fs';
import AWS from 'aws-sdk';
import Logger from '../helpers/Logger';
import Jimp from 'jimp';

class ImageController {
  constructor(config) {
    this.config = config;
    AWS.config.update({
      accessKeyId: config.aws.key,
      secretAccessKey: config.aws.secret,
    });

    this.s3 = new AWS.S3();
  }

  post(req, res) {
    const data = {
      key: req.body.key.trim(),
    };
    try {
      console.log('ping');
      this.processImage(data);
      res.send({ success: true });
    } catch (err) {
      res.send({ success: false });
      Logger.throw(res, '2365958507', err);
    }
  }

  processImage(data, res) {
    try {
      console.log(data);
      console.log('process');
      const file = fs.createWriteStream(`./tmp/images/${key}`);
      const key = data.key;
      const params = {
        Bucket: this.config.aws.bucket,
        Key: `images/${key}`,
      };
      console.log('start process');

      this.s3.getObject(params).createReadStream().pipe(file)
        .on('finish', () => {
          console.log('processes image');
          const filePath = `./tmp/images/${key}`;
          // console.log(filePath);
          Jimp.read(filePath).then((image) => {
            image
              .exifRotate()
              .scaleToFit(1080, 1920)
              .quality(75)
              .write(`./tmp/images/processed/${key}`, () => {
                this.moveImageToS3(key, filePath);
                console.log('moving');
              });
          }).catch((err) => {
            console.log(err);
          });
        });
    } catch (err) {
      console.log(err);
      Logger.throw(res, '2365958507', err);
    }
  }

  /**
   * Move processed image to S3
   */
  moveImageToS3(fileName, filePath) {
    try {
      // Read in the file, convert it to base64, store to S3
      fs.readFile(filePath, (err, data) => {
        if (err) { throw err; }
        const base64data = Buffer.from(data, 'binary');
        const bucket = this.config.aws.bucket;
        const key = `images/processed/${fileName}`;

        this.s3.putObject({
          Bucket: bucket,
          Key: key,
          Body: base64data,
        }, (error, result) => {
          if (error) {
            reject(error);
          }
          const file = {
            path: key,
            s3: result,
          };
          console.log('image moved');
          console.log(file);
        });
      });
    } catch (err) {
      console.log(err);
      // Logger.throw(res, '2365958507', err);
    }
  }
}

export default ImageController;