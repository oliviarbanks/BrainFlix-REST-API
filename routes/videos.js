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
  } else if (req.query.minimal === "true") {
    res.json({
      title: foundVideo.title,
      channel: foundVideo.channel,
      image: foundVideo.image,
    });
  } else {
    res.json(foundVideo);
  }
});

router.post("/", (req, res) => {
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: req.body.channel,
    image: req.body.image,
    description: req.body.description,
    views: req.body.views,
    likes: req.body.likes,
    duration: req.body.duration,
    video: req.body.video,
    timestamp: req.body.timestamp,
  };
  const videos = readVideoDetailsFile();
  videoList.push(newVideo);
  fs.writeFileSync("./data/data.json", JSON.stringify(videos));
  res.json(newVideo);
});

module.exports = router;
