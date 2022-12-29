import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

export default async function handler(req, res) {

  console.log('body', req.body) // request body

  console.log('query', req.query)

  const id = Number(req.query.player_id);
  
  
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db();
    const nbaStatsCollections = db.collection(MONGODB_DB);
    const result = await nbaStatsCollections
      .find({ _id: id })
      .toArray();
    console.log(result[0].imgSrc)
    client.close();
    res.status(201).json(result[0].imgSrc);
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
