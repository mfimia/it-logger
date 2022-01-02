const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const client = new MongoClient(process.env.REACT_APP_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// This route allows us to get all techs
// @route   GET api/techs
// desc     Get top techs
// @access  Private
router.get("/", async (req, res) => {
  try {
    client.connect(async () => {
      const db = client.db("ITLogger");
      const techs = await db.collection("Techs").find().toArray();
      client.close();
      res.json(techs);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// This route will allow to add a tech
// @route   POST api/techs
// desc     Add new Tech
// @access  Private
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName } = await req.body;
    const newTech = {
      firstName,
      lastName,
    };

    client.connect(async () => {
      const db = client.db("ITLogger");
      await db.collection("Techs").insertOne(newTech);
      client.close();
      res.json(newTech);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
