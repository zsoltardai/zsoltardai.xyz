import styles from './card.module.css';

export default function Card({ children, padding = '1rem' }) {
    return <div className={styles.card} style={{ padding: padding }}>{children}</div>;
}
