import styles from '../styles/login.module.css';
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import {useRef, useState} from "react";
import useSession from "../hooks/useSession";
import getSession from "../lib/auth/getSession";
import {useRouter} from "next/router";
import Link from "next/link";
import Text from "../components/ui/text";
import Envelope from "../components/icons/envelope";
import Eye from "../components/icons/eye";
import EyeBlind from "../components/icons/eye-blind";

export default function Login() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useSession();
  const [hidden, setHidden] = useState(true);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const result = await login(email, password);
    if (result) return router.replace('/dashboard');
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Text variant="h1" marginBottom={32}>Login</Text>
        <Input
            ref={emailRef}
            type="email"
            placeholder="e.g. example.user@email.com"
            marginBottom={22}
            Icon={Envelope}
        />
        <Input
            ref={passwordRef}
            type={hidden ? "password" : "text"}
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            marginBottom={22}
            Icon={hidden ? Eye : EyeBlind}
            onClickIcon={() => setHidden(previous => !previous)}
        />
        <Button title="Login" />
        <div>
          <p className={styles.question}>
            Don&apos;t you have an account? Register
            <Link href="/register"> here.</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const {req, res} = context;
  const session = getSession({req, res})
  if (session) return {redirect: {destination: '/dashboard', permanent: false}};
  return { props: {} };
}
