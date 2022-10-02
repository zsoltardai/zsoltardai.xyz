import {MongoClient} from "mongodb";

export default async function getBlog(slug) {
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGODB);
    if (!slug) {
      return await client.db().collection('blogs').find().toArray();
    }
    return await client.db().collection('blogs').findOne({slug});
  } catch (error) {
    console.error(error.message);
  } finally {
    await client.close();
  }
  return null;
}
