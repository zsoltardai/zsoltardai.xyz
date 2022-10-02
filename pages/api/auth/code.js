import {MongoClient} from "mongodb";
import crypto from "crypto";
import getSession from "../../../lib/auth/getSession";

export default async function handler(req, res) {
  let client; let message;
  const ALLOWED = ['POST'];

  if (ALLOWED.includes(req.method)) {
    try {
      client = await MongoClient.connect(process.env.MONGODB);
    } catch (error) {
      message = 'Failed to connect to the database, try again later!';
      res.status(500).send(message);
      return;
    }
  }

  if (req.method === 'POST') {
    let { code } = req.body;

    const issuer = getSession({req, res});

    code = code ? code : crypto.randomBytes(20).toString('base64');

    const id = crypto.randomBytes(16).toString('base64');

    code = {
      _id: id,
      code,
      issuer: issuer.id,
    };

    try {
      await client.db().collection('codes').insertOne(code);
    } catch (error) {
      message = 'Failed to insert code to the database!';
      res.status(500).send(message);
      await client.close();
      return;
    }

    res.status(201).json(code);
    return;
  }

  message = 'Only POST requests are allowed!';
  res.status(405).send(message);
}
