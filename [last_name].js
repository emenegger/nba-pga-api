import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

export default async function handler(req, res) {
  console.log("query", req.query); // url queries

  const lastName =
    req.query.last_name[0].toUpperCase() + req.query.last_name.slice(1);

  try {
    const client = await MongoClient.connect(MONGODB_URI);
    // const client = await clientPromise;
    const db = client.db();

    const nbaStatsCollections = db.collection(MONGODB_DB);

    const result = await nbaStatsCollections
      .find({ last_name: lastName })
      .toArray();
    client.close();
    res.status(201).json(result);
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
