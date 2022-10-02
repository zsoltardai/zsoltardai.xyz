import {MongoClient} from "mongodb";
import crypto from 'crypto';
import md5 from 'md5';

export default async function handler(req, res) {
  let client; let message; let user;
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

    const { firstname, lastname, email, password, code } = req.body;

    if (!firstname || firstname.trim() === '') {
      message = 'The provided firstname is invalid!';
      res.status(400).send(message);
      await client.close();
      return;
    }

    if (!lastname || lastname.trim() === '') {
      message = 'The provided lastname is invalid!';
      res.status(400).send(message);
      await client.close();
      return;
    }

    if (!(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(email)) {
      message = 'The provided e-mail address is invalid!';
      res.status(400).send(message);
      await client.close();
      return;
    }

    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(password)) {
      message = 'The provided password is invalid!';
      res.status(400).send(message);
      await client.close();
      return;
    }

    if (!code || code.trim() === '') {
      message = 'You did not provide a valid registration code!';
      res.status(400).send(message);
      await client.close();
      return;
    }

    try {
      const {deletedCount} = await client.db().collection('codes').deleteOne({code});
      if (deletedCount !== 1) {
        message = 'The provided registration code was invalid!';
        res.status(400).send(message);
        await client.close();
        return;
      }
    } catch (error) {
      message = 'Failed to delete registration code from the database, try again later!';
      res.status(500).send(message);
      await client.close();
      return;
    }

    try {
      user = await client.db().collection('users').findOne({ email });
    } catch (error) {
      message = 'Failed to fetch users from the database!';
      res.status(500).send(message);
      await client.close();
      return;
    }

    if (user) {
      message = 'User already exists with the provided e-mail address!';
      res.status(409).send(message);
      await client.close();
      return;
    }

    const id = crypto.randomBytes(20).toString('base64');

    user = {
      _id: id,
      email,
      firstname,
      lastname,
      password: md5(password)
    };

    try {
      await client.db().collection('users').insertOne({...user});
    } catch (error) {
      message = 'Failed to insert the user to the database!';
      res.status(500).send(message);
      await client.close();
      return;
    }

    delete user['password'];

    res.status(201).json(user);
    await client.close();
    return;
  }

  message = 'Only POST requests are allowed!';
  res.status(405).send(message);
}
