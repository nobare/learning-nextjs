import { MongoClient } from 'mongodb';

async function handler (req, res) {
  if (req.method === 'POST') {
    //Get Request
    const data = req.body;

    // Connect to Database
    const client = await MongoClient.connect(
      'mongodb+srv://nobareadm:tdb3bzmJs4SezuA6@nobaredb.fb61i.gcp.mongodb.net/batadase?retryWrites=true&w=majority'
    );

    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    // Insert Data
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();

    res.status(201).json({message: 'Meetup Inserted'});
  }
}

export default handler;