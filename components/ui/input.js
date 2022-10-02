import styles from './input.module.css';

export default function Input({label, id, innerRef, ...props}) {
  return (
      <div className={styles.container}>
        {label && <label htmlFor={id} className={styles.label}>{label}</label>}
        <input className={styles.input} id={id} ref={innerRef} {...props} />
      </div>
  );
}
