import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;
