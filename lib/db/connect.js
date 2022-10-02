import {MongoClient} from "mongodb";

export default async function connect() {
  try {
    return await MongoClient.connect(process.env.MONGODB);
  } catch (error) {
    console.error(error.message);
  }
  return null;
}
