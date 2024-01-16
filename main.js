const express = require("express");
const morgan = require("morgan");
const router = require("./src/mainRoutes");
const app = express();

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", router);
module.exports = app;
