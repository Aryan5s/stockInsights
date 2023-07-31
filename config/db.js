const { MongoClient } = require('mongodb');
require('dotenv').config();
const mongoURL = process.env.MONGO_URL;

async function connectDB() {
  try {
    const client = await MongoClient.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db();
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = {
  connectDB,
};

