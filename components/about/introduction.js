import { Fragment } from 'react';
import styles from './introduction.module.css';

export default function Introduction() {
    const currentDate = new Date();
    const birthdate = new Date(2000, 10, 28);
    const years = (currentDate.getFullYear() - birthdate.getFullYear()) - 1;
    const birthday = (currentDate.getMonth() === 10) && currentDate.getDate() === 28;
    return (
        <Fragment>
            <div className={styles.container}>
                <section>
                    My name is <b>Zsolt Ardai</b>, I&apos;m currently { years } years old
                    { birthday ? 'and today is my birthday! 🎉🧁🎁' : '.' } I live in Debrecen, Hungary. 🌃
                </section>
            </div>
        </Fragment>
    );
}