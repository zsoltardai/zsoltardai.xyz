import { LinearProgress } from '@mui/material';
import styles from './education.module.css';

export default function Education() {
    const total = 210; const current = 180;
    let percentage  = (current/total) * 100;
    return (
      <div className={styles.container}>
          <section>
              I&apos;m currently studying Business IT at the university of Debrecen.
              According to my plans I want to finish my Bsc studies in 2023.
          </section>
          <section>
              I still have { total - current } credits left to finish my major, and I cannot wait
              to hold my degree in my hands.
          </section>
          <LinearProgress className={styles.progress} variant="determinate" value={percentage}  />
          <p className={styles.center}>{ current } out of { total }</p>
      </div>
    );
}
