import { Fragment } from 'react';
import { getSession } from 'next-auth/client';
import styles from '../../styles/administration/home.module.css'

export default function Home() {
    return (
      <Fragment>
        <h1>Welcome!</h1>
      </Fragment>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    if (!session) return { redirect: { destination: '/administration/login', permanent: false } };
    return { props: { } };
}
