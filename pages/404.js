import { useAmp } from 'next/amp';
import Image from 'next/image';
import Button from '../components/ui/button';
import styles from '../styles/404.module.css';

export const config = { amp: 'hybrid' };

export default function NotFound() {
    const isAmp = useAmp();
    return (
        <div className={styles.container}>
          {
            isAmp
              ?
                <amp-img
                  src='/404.svg'
                  alt='404 image'
                  height={250}
                  width={400}
                  layout='responsive'
                />
                :
                <Image
                    src='/404.svg'
                    alt='404 image'
                    height={250}
                    width={400}
                    layout='responsive'
                />
          }
          <h1>404</h1>
          <small>
              It looks like the page you are looking for does not exist.
              Use the button bellow to get back to safety.
          </small>
          <small>As you can see it is { isAmp ? '' : 'not' } an AMP page.</small>
          <Button href='/'>Go back</Button>
        </div>
    );
}
