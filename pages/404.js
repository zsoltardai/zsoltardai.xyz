import Image from 'next/image';
import Button from '../components/ui/button';
import styles from '../styles/404.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <Image src='/404.svg' alt='' height={250} width={400} />
            <h1>404</h1>
            <small>
                It looks like the page you are looking for does not exist.
                Use the button bellow to get back to safety.
            </small>
            <Button href='/'>Go back</Button>
        </div>
    );
}
