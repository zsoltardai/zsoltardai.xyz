import {MongoClient} from "mongodb";

export default async function getPoem(slug) {
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGODB);
    if (!slug) {
      return await client.db().collection('poems').find().toArray();
    }
    return await client.db().collection('poems').findOne({slug});
  } catch (error) {
    console.error(error.message);
  } finally {
    await client.close();
  }
  return null;
}
