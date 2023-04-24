const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const videoList = JSON.parse(fs.readFileSync("./data/data.json"));

function readVideoDetailsFile() {
  return videoList;
}

router.get("/", (req, res) => {
  const videos = readVideoDetailsFile();
  res.json(videos);
});

router.get("/:id", (req, res) => {
  const videoId = req.params.id;
  const foundVideo = videoList.find((video) => {
    return video.id === videoId;
  });
  if (!foundVideo) {
    res.status(404).send("Video not found");
  } else {
    res.status(201).json(foundVideo);
  }
});

router.post("/", (req, res) => {
  const timestamp = Math.floor(Date.parse(new Date()) / 1000);
  let newVideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: "Channel Name",
    image: req.body.image,
    description: req.body.description,
    views: 0,
    likes: 0,
    duration: "0:00",
    video: req.body.video,
    timestamp: timestamp,
    comments: [],
  };
  const videos = readVideoDetailsFile();
  videos.push(newVideo);
  fs.writeFileSync("./data/data.json", JSON.stringify(videos));
  res.status(202).json(newVideo);
});

module.exports = router;
