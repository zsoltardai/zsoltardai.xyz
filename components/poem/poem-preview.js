import { Fragment } from 'react';
import Link from 'next/link';
import styles from './poem-preview.module.css';

export default function PoemPreview({ poem }) {
    const { slug, title, content, author, date } = poem;
    const formattedDate = new Date(date).toLocaleDateString('en-US',
        { day: 'numeric', 'month': 'long', year: 'numeric' });
    const excerpt = content.split('.').splice(0, 3).join('.') + '.';
    return (
        <Fragment>
            <div className={styles.poem}>
                <Link href={'/poems/' + slug} title={'read the ' + title}>
                    <a>
                        <h2 className={styles.title}>{title}</h2>
                        <div className={styles.meta}>
                    <span>
                        Written by
                        <span className={styles.highlighted}> {author.firstname} {author.lastname}</span>
                    </span>
                            <span>
                        on
                        <time className={styles.highlighted}> {formattedDate}</time>
                    </span>
                        </div>
                        <p className={styles.excerpt}>
                            {excerpt}
                        </p>
                    </a>
                </Link>
            </div>
        </Fragment>
    );
}
