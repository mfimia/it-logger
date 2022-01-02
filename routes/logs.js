const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const client = new MongoClient(process.env.REACT_APP_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// This route allows us to get all logs
// @route   GET api/logs
// desc     Get top logs
// @access  Private
router.get("/", async (req, res) => {
  try {
    client.connect(async () => {
      const db = client.db("ITLogger");
      const logs = await db.collection("Logs").find().toArray();
      client.close();
      res.json(logs);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// This route will allow to add a log
// @route   POST api/logs
// desc     Add new Log
// @access  Private
router.post("/", async (req, res) => {
  try {
    const { message, attention, techSelected, date } = await req.body;
    const newLog = {
      message,
      attention,
      techSelected,
      date,
    };

    client.connect(async () => {
      const db = client.db("ITLogger");
      await db.collection("Logs").insertOne(newLog);
      client.close();
      res.json(newLog);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
