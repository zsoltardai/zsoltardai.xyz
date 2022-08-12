import { Fragment } from 'react';
import Instagram from '../icons/instagram';
import Facebook from '../icons/facebook';
import LinkedIn from '../icons/linkedin';
import styles from './socials.module.css';

export default function Socials() {
    return (
        <Fragment>
            <div className={styles.container}>
                <a href='https://www.facebook.com/zsolt.ardai2000/'>
                    <Facebook width={20} height={20} color='#027BCE' />
                </a>
                <a href='https://www.instagram.com/ardai.zsolt/'>
                    <Instagram width={20} height={20} color='#027BCE' />
                </a>
                <a href='https://www.linkedin.com/in/zsoltardai/'>
                    <LinkedIn width={20} height={20} color='#027BCE' />
                </a>
            </div>
        </Fragment>
    );
}
