import Button from '../components/ui/button';
import Image from '../components/ui/image';
import styles from '../styles/404.module.css';

export const config = { amp: 'hybrid' };

export default function NotFound() {
    return (
        <div className={styles.container}>
          <Image
              src='/404.svg'
              alt='404 image'
              height={160}
              width={300}
              layout='responsive'
          />
          <h1>404</h1>
          <small>
              It looks like the page you are looking for does not exist.
              Use the button bellow to get back to safety.
          </small>
          <Button href='/'>Go back</Button>
        </div>
    );
}
