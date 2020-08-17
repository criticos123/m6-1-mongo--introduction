const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function getUsers(req, res) {
  const client = await MongoClient(MONGO_URI, { useUnifiedTopology: true });

  await client.connect();

  const db = client.db("exercise_1");
  // console.log("connected!");
  //
  // await db.collection("users").insertOne({ name: "Buck Rogers" });
  const data = await db.collection("users").find().toArray();
  console.log(data);
  client.close();
  if (data.length > 0) {
    res.status(200).json({ status: 200, data });
  } else {
    res.status(404);
  }
}

module.exports = { getUsers };
