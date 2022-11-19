import React from 'react';
import styles from './card.module.css';

const Card = ({ children, padding = '1rem' }) => {
    return (
        <div className={styles.card} style={{ padding: padding }}>
            {children}
        </div>
    );
}

export default Card;
