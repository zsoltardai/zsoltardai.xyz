import React from '../icons/react';
import Button from '../ui/button';
import styles from './introduction.module.css';

export default function Introduction(){
    return (
      <div className={styles.container}>
          <h1 className={styles.h1}>
              Hi<span className={styles.dot}>,</span>  👋🏽
              I&apos;m Zsolt<span className={styles.dot}>;</span>
          </h1>
          <div className={styles.content}>
              <span className={styles.text}>
                  and I&apos;m a frontend developer. I create websites using
                  <b> Next<span className={styles.dot}>.</span>js</b>
              </span>
              <Button
                title="Learn more.."
                href='/about'
                height={40}
              />
          </div>
      </div>
    );
}
