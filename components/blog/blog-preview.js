import { Fragment } from 'react';
import Link from 'next/link';
import styles from './blog-preview.module.css';


export default function BlogPreview({ blog }) {
    const { slug, title, excerpt, date, author } = blog;
    const formattedDate = new Date(date).toLocaleDateString('en-US',
        { day: 'numeric', month: 'long', year: 'numeric' });
    return (
      <Fragment>
          <Link href={'/blogs/' + slug}>
              <div className={styles.blog}>
                  <h1>{title}</h1>
                  <div className={styles.header}>
                        <span className={styles.left}>
                            <span>By</span>
                            <span className={styles.highlight}>{author}</span>
                        </span>
                        <span className={styles.right}>
                            <span>on</span>
                            <time className={styles.highlight}>{formattedDate}</time>
                        </span>
                  </div>
                  <p className={styles.excerpt}>{excerpt}</p>
              </div>
          </Link>
      </Fragment>
    );
}
