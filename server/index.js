const express = require("express");
const cors = require("cors");
const connectMongo = require("./db");
require("dotenv").config();
connectMongo();
const app = express();
const port = 4000;
app.get("/", (req, res) => {
  res.send(
    `    backend of notebook application running succesfully by ${process.env.AUTHOR} !
`
  );
});
app.use(express.json());
app.use(cors());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log("app listening at http://localhost:" + port);
});
