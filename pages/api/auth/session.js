import jwt from "jsonwebtoken";
import {getCookie} from "cookies-next";

export default async function handler(req, res) {
  let message; let user;

  if (req.method === 'GET') {
    const token = getCookie('auth.token', {req, res});

    if (!token) {
      res.status(200).json(null);
      return;
    }

    if (!jwt.verify(token, process.env.SECRET)) {
      message = 'The provided token was invalid!';
      res.status(403).send(message);
      return;
    }

    user = jwt.decode(token);

    res.status(200).send(user);
    return;
  }

  message = 'Only GET requests are allowed!';
  res.status(405).send(message);
}
