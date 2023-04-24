const express = require("express");
const app = express();
const port = process.env.PORT || process.argv[2] || 8085;
const cors = require("cors");
const videoRoute = require("./routes/videos");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use("/public-images", express.static("./public/images"));

app.use("/videos", videoRoute);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
