import { Fragment } from 'react';
import BlogsGrid from '../blog/blogs-grid';
import styles from './featured-blogs.module.css';

export default function FeaturedBlogs({ featuredBlogs }) {
    return (
      <Fragment>
          <div className={styles.container}>
              <BlogsGrid blogs={featuredBlogs} />
          </div>
      </Fragment>
    );
}