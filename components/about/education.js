import { LinearProgress } from '@mui/material';
import styles from './education.module.css';

export default function Education() {
    const total = 210; const current = 210;
    let percentage  = (current/total) * 100;
    return (
      <div className={styles.container}>
          <section>
              I&apos;ve just finished my Business Informatics (Bsc) major at the University of Debrecen,
              and I&apos;ll get my degree on hand on the 27th of January.
          </section>
          <LinearProgress className={styles.progress} variant="determinate" value={percentage}  />
          <p className={styles.center}>{ current } out of { total } credits</p>
      </div>
    );
}
