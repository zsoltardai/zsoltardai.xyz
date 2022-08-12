import styles from './tag.module.css';

export default function Tag({ children, width = 100, height = 35 }) {
    return <div style={{ width: width + 'px', height: height + 'px' }}
                className={styles.tag}>{children}</div>;
}
