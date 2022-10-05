import getSession from "../lib/auth/getSession";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import {useRef, useState} from "react";
import styles from '../styles/register.module.css';
import useSession from "../hooks/useSession";
import {useRouter} from "next/router";
import Link from "next/link";
import Text from "../components/ui/text";
import Person from "../components/icons/person";
import Envelope from "../components/icons/envelope";
import Secret from "../components/icons/secret";
import Eye from "../components/icons/eye";
import EyeBlind from "../components/icons/eye-blind";

export default function Register() {
  const router = useRouter();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const codeRef = useRef();
  const { register } = useSession();
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
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
        <Text variant="h1" marginBottom={16}>Register</Text>
        <div className={styles.grid}>
          <Input
              ref={firstnameRef}
              placeholder="e.g. Jon"
              marginBottom={16}
              Icon={Person}
          />
          <Input
              ref={lastnameRef}
              placeholder="e.g. Johnson"
              marginBottom={16}
              Icon={Person}
          />
          <Input
              ref={emailRef}
              placeholder="e.g. example.user@email.com"
              marginBottom={16}
              Icon={Envelope}
          />
          <Input
              ref={codeRef}
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
              marginBottom={16}
              Icon={Secret}
          />
          <Input
              ref={passwordRef}
              type={passwordHidden ? "password" : "text"}
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
              marginBottom={16}
              Icon={passwordHidden ? Eye : EyeBlind}
              onClickIcon={() => setPasswordHidden(previous => !previous)}
          />
          <Input
              ref={confirmPasswordRef}
              type={confirmPasswordHidden ? "password" : "text"}
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
              marginBottom={16}
              Icon={confirmPasswordHidden ? Eye : EyeBlind}
              onClickIcon={() => setConfirmPasswordHidden(previous => !previous)}
          />
        </div>
        <Button title="Register" />
        <div>
          <p className={styles.question}>
            Do you have an account? Login
            <Link href="/login"> here.</Link>
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
