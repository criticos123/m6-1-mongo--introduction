const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
async function addUsers(req, res) {
  try {
    const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

    await client.connect();

    const db = client.db("exercise_1");

    await db.collection("users").insertOne(req.body);

    client.close();

    res.status(201).json({ status: 201, data: req.body });
  } catch ({ message }) {
    res.status(401).json({ status: 401, message: message });
  }
}
module.exports = { addUsers };
