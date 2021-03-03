const config = require("./config/index");
const express = require("express");
const mongoose = require("mongoose");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(hpp());
app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connecting Success!!");
  })
  .catch((err) => console.log(err));

app.listen(config.PORT, () => {
  console.log(`Server started on ${config.PORT} port`);
});
