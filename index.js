import { MongoClient } from "mongodb";
// import clientPromise, { connectToDatabase } from "../../../lib/mongodb"

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

async function handler(req, res) {
  console.log('reached handler');

  if (req.method === 'GET') {
    try {
      const client = await MongoClient.connect(MONGODB_URI);
      // const client = await clientPromise;
      const db = client.db();
 
      const nbaStatsCollections = db.collection(MONGODB_DB);

      const result = await nbaStatsCollections.find().sort({ last_name: 1 }).toArray();
      client.close();
      res.status(201).json(result);
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  }

  // try {
  //   let { db } = await connectToDatabase();
  //   let players = await db
  //   .collection('nba_player_bio_stats')
  //   .find({})
  //   .sort({ last_name: 1 })
  //   .toArray();
  //   return res.json({
  //     message: JSON.parse(JSON.stringify(players)),
  //     success: true,
  //   })
  // } catch (error) {
  //   return res.json({
  //     message: new Error(error).message,
  //     success: false,
  // });
  // }

}

export default handler