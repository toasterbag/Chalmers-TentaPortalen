import crypto from "crypto";

export const randomBytes = (len: number): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(len, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

export const genToken = () =>
  randomBytes(64).then((bytes) => bytes.toString("base64"));
