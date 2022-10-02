import getSession from "../lib/auth/getSession";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import {useRef} from "react";
import styles from '../styles/register.module.css';
import useSession from "../hooks/useSession";
import {useRouter} from "next/router";

export default function Register() {
  const router = useRouter();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const codeRef = useRef();
  const { register } = useSession();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const firstname = firstnameRef.current.value;
    const lastname = lastnameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const code = codeRef.current.value;
    const result = await register(firstname, lastname, email, password, code);
    if (result) return router.replace('/dashboard');
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className={styles.grid}>
          <Input
              label="Firstname"
              id="firstname"
              innerRef={firstnameRef}
              placeholder="e.g. Jon"
          />
          <Input
              label="Lastname"
              id="lastname"
              innerRef={lastnameRef}
              placeholder="e.g. Johnson"
          />
          <Input
              label="E-mail"
              id="email"
              innerRef={emailRef}
              placeholder="e.g. example.user@email.com"
          />
          <Input
              label="Code"
              id="code"
              innerRef={codeRef}
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
          />
          <Input
              label="Password"
              id="password"
              innerRef={passwordRef}
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
          />
          <Input
              label="Confirm password"
              id="confirmPassword"
              innerRef={confirmPasswordRef}
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
          />
        </div>
        <Button width="100%">Register</Button>
        <div>
          <p className={styles.question}>
            Do you have an account? Login
            <a href="/login"> here.</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const {req, res} = context;
  const session = getSession({req, res});
  if (session) return {redirect: { destination: '/dashboard' }};
  return {props: {}};
}
