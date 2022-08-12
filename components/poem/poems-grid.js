import styles from './poems-grid.module.css';
import PoemPreview from './poem-preview';

export default function PoemsGrid({ poems }) {
    return (
        <ul className={styles.grid}>
            {
                poems.map(poem => {
                    return (
                        <li key={poem.slug}>
                            <PoemPreview poem={poem} />
                        </li>
                    );
                })
            }
        </ul>
    );
}