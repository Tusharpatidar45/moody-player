const express = require("express");
const multer = require("multer");
const { uploadFile } = require("../service/storage.service");
const SongModel = require("../models/song.model");
const routes = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

routes.post("/songs", upload.single("audio"), async (req, res) => {
  try {
    const uploadedUrl = await uploadFile(req.file);

    const song = await SongModel.create({
      title: req.body.title,
      artist: req.body.artist,
      audio: uploadedUrl,
      mood: req.body.mood,
    });
    res.status(200).json({
      message: "Song uploaded successfully",
      song: song,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Failed to upload song" });
  }
});

routes.get("/songs", async (req, res) => {
  const { mood } = req.query;

  const songs = await SongModel.find({
    mood: mood,
  });

  res.json({
    massage: "Songs fetched successfully",
    songs: songs,
  });
});
module.exports = routes;
