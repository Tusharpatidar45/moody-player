const ImageKit = require("imagekit");
let mongoose = require("mongoose");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = async (file) => {
  const result = await imagekit.upload({
    file: file.buffer,
    fileName: new mongoose.Types.ObjectId().toString(),
    folder: "moody-player-songs",
  });
  return result.url;
};

module.exports = { imagekit, uploadFile };
