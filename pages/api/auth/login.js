import {MongoClient} from "mongodb";
import jwt from "jsonwebtoken";
import md5 from "md5";

export default async function handler(req, res) {
  let client; let message;  let token; let user;
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

    const { email, password } = req.body;

    if (!(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(email)) {
      message = 'The provided e-mail address is invalid!';
      res.status(400).send(message);
      await client.close();
      return;
    }

    if (!password || password.trim() === '') {
      message = 'You did not provide a valid password!';
      res.status(400).send(message);
      await client.close();
      return;
    }

    try {
      user = await client.db().collection('users').findOne({email});
    } catch (error) {
      message = 'Failed to fetch users from the database!';
      res.status(400).send(message);
      await client.close();
      return;
    }

    if (!user) {
      message = 'There is no user with the provided e-mail address!';
      res.status(403).send(message);
      await client.close();
      return;
    }

    if (user.password !== md5(password)) {
      message = 'The provided credentials were invalid!';
      res.status(403).send(message);
      await client.close();
      return;
    }

    let payload = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };

    token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1h'});

    res.status(200).setHeader('Set-Cookie', `auth.token=${token};path=/;`).send();
    return;
  }

  message = 'Only POST requests are allowed!';
  res.status(405).send(message);
}
