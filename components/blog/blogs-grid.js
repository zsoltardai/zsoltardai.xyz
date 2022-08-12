import BlogPreview from './blog-preview';
import styles from './blogs-grid.module.css';

export default function BlogsGrid({ blogs }) {
    return (
      <ul className={styles.grid}>
          {
            blogs.map(blog => {
                return (
                    <li key={blog.slug}>
                        <BlogPreview blog={blog} />
                    </li>
                );
            })
          }
      </ul>
    );
}