import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const options = {
  // Remove the useNewUrlParser and useUnifiedTopology options
};

let client;

async function connectToDB() {
  try {
    if (!client || !client.isConnected()) {
      client = new MongoClient(uri, options);
      await client.connect();
    }
    return client.db("multi-admin");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // rethrow the error for proper error handling in the calling code
  }
}

async function disconnectFromDB() {
  try {
    if (client && client.isConnected()) {
      await client.close();
      console.log("Disconnected from the database");
    }
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
  }
}

export { connectToDB, disconnectFromDB };
