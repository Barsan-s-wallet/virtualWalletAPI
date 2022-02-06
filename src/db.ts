import { MongoClient } from "mongodb";
import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, "../.env") });
const mongoUri: string = String(process.env.MONGO_DB);
const client = new MongoClient(mongoUri, { useUnifiedTopology: true });

export const Main = async (): Promise<any> => {
  try {
    await client.connect();
    return client;
  } catch (err) {
    throw new Error(err as any);
  }
};

Main()
  .then((db) => console.log(db))
  .catch((err) => console.error(err));

export default client;

// export default client;
