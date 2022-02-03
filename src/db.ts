import { MongoClient } from "mongodb";
import { join } from "path";
import { config } from "dotenv";

config({ path: join(__dirname, "../.env") });

const mongoUri: string = process.env.MONGO_DB!;

const client = new MongoClient(mongoUri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

export default client;
