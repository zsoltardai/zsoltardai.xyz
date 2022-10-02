import {getCookie} from "cookies-next";
import jwt from "jsonwebtoken";

export default function getSession(options) {
  let session; const {req, res} = options;
  const token = getCookie('auth.token', {req, res});
  if (!token) return null;
  if (!jwt.verify(token, process.env.SECRET)) return null;
  session = jwt.decode(token);
  return session;
}
