import Link from 'next/link';
import styles from './button.module.css';

export default function Button({ href, onClick = (() => {}), children,
                                   circle = false, width = null, height = null }) {
    if (!href) return (
        <button className={`${ circle ? styles.circular : styles.squared }`} style={{ width: width, height: height }}
                onClick={onClick}>{children}</button>
    );
    return (
        <Link href={href}>
            <a className={`${ circle ? styles.circular : styles.squared }`} style={{ width: width, height: height }}>
                {children}
            </a>
        </Link>
    );
}