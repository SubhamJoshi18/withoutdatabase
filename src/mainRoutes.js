const express = require("express");
const router = express.Router();
const fs = require("fs");

let readAble = JSON.parse(fs.readFileSync("MOCK_DATA.json", "utf-8"));

router.get("/", (req, res) => {
  try {
    res.status(200).json({
      stats: "It is successfully read",
      title: "Reading the daata from the file",
      data: {
        readAble,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "INTERNAL SERVER ERROR",
    });
  }
});

router.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const search = readAble.find((a) => a.id === id);
    res.status(200).json({
      status: "It is successfully captured",
      title: "Reading the data from the file",
      data: {
        search,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
});

router.post("/", (req, res) => {
  try {
    const newId = readAble[readAble.length - 1].id + 1;
    const adeded = Object.assign({ id: newId }, req.body);
    readAble.push(adeded);
    console.log(readAble);
    fs.writeFile(
      `${__dirname}/MOCK_DATA.json`,
      JSON.stringify(readAble),
      (err) => {
        res.status(200).json({
          status: "It is sucessfully captrued the data from the json file",
          title: "Creating a data in the file",
          data: {
            readAble,
          },
        });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
});

router.patch("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const check = Object.assign({ id: id }, req.body, { new: true });
    res.status(200).json({
      status: "Successfully updated the required value in the json",
      title: "PATCHING THE JSON FILE",
      data: {
        check,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = readAble.filter((u) => {
      return u.id !== id;
    });

    const deleted = readAble.splice(index, -1);
    res.status(200).json({
      status: "Successfully deleted the required value in the json",
      title: "Deleting the file from the json",
      data: {
        index,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
});
module.exports = router;
