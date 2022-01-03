const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
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
      const logs = await db
        .collection("Logs")
        .find({
          $or: [
            { message: { $regex: req.query.q } },
            { techSelected: { $regex: req.query.q } },
            { date: { $regex: req.query.q } },
          ],
        })
        .toArray();
      console.log(logs);
      res.json(logs);
      await client.close();
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
      res.json(newLog);
      await client.close();
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// This route will allow to delete a log
// @route   DELETE api/logs
// desc     Delete log
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    client.connect(async () => {
      const db = client.db("ITLogger");
      await db.collection("Logs").deleteOne({ _id: ObjectId(req.params.id) });
      const logs = await db.collection("Logs").find().toArray();
      res.json(logs);
      await client.close();
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// This route will allow to update a log
// @route   update api/logs
// desc     update log
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const { message, attention, techSelected, date } = await req.body;
    const log = {
      message,
      attention,
      techSelected,
      date,
    };
    client.connect(async () => {
      const db = client.db("ITLogger");
      await db
        .collection("Logs")
        .updateOne({ _id: ObjectId(req.params.id) }, { $set: log });

      const sentLog = await db
        .collection("Logs")
        .findOne({ _id: ObjectId(req.params.id) });

      const logs = await db.collection("Logs").find().toArray();
      res.json({ sentLog, logs });
      await client.close();
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
