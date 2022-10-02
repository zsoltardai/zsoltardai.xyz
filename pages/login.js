import styles from '../styles/login.module.css';
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import {useRef} from "react";
import useSession from "../hooks/useSession";
import getSession from "../lib/auth/getSession";
import {useRouter} from "next/router";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useSession();
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
        <h2>Login</h2>
        <Input id="email" innerRef={emailRef} label="E-mail" placeholder="e.g. example.user@email.com" />
        <Input id="password" innerRef={passwordRef} label="Password" type="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;" />
        <Button width="100%">Login</Button>
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
