import Link from 'next/link';
import styles from './logo.module.css';

export default function Logo() {
    return (
        <Link href='/'>
            <span className={styles.logo}>
                <span className={styles.text}>Zsolt</span>
                <span className={styles.dot}>.</span>
            </span>
        </Link>
    )
}
