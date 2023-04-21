const app = require("express")();
const PORT = 8089;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("any text here for middleware");
  next();
});

app.listen(PORT, () => {
  console.log("server is running on port:");
});
