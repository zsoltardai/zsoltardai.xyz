import Instagram from '../icons/instagram';
import Facebook from '../icons/facebook';
import LinkedIn from '../icons/linkedin';
import styles from './socials.module.css';

export default function Socials() {
    return (
        <>
            <div className={styles.container}>
                <a href='https://www.facebook.com/zsolt.ardai2000/' target='_blank' rel='noreferrer'>
                    <Facebook width={20} height={20} color='#027BCE' />
                </a>
                <a href='https://www.instagram.com/ardai.zsolt/' target='_blank' rel='noreferrer'>
                    <Instagram width={20} height={20} color='#027BCE' />
                </a>
                <a href='https://www.linkedin.com/in/zsoltardai/' target='_blank' rel='noreferrer'>
                    <LinkedIn width={20} height={20} color='#027BCE' />
                </a>
            </div>
        </>
    );
}
