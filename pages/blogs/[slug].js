import { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import renderer from '../../lib/renderer-util';
import Back from '../../components/icons/back';
import { useRouter } from 'next/router';
import { getAllBlogs, getBlogBySlug } from '../../lib/blogs-util';
import styles from '../../styles/blog.module.css';

export default function Blog({ blog }) {
    const router = useRouter();
    const { title, content, author, date } = blog;
    const formattedDate = new Date(date).toLocaleDateString('en-US',
        { day: 'numeric', month: 'long', year: 'numeric' });
    const backButtonClickHandler = () => router.back();
    return (
        <Fragment>
            <div className={styles.container}>
                <h1>{title}</h1>
                <div className={styles.meta}>
                    <span>
                        <span>Posted by</span>
                        <span className={styles.highlighted}> {author}</span>
                    </span>
                    <span>
                        <span>on</span>
                        <time className={styles.highlighted}> {formattedDate}</time>
                    </span>
                </div>
                <div>
                    <ReactMarkdown components={renderer}>{content}</ReactMarkdown>
                </div>
                <div onClick={backButtonClickHandler} className={styles.back}>
                    <Back color='var(--primary-color)' />
                </div>
            </div>
        </Fragment>
    );
}

export async function getStaticPaths() {
    const blogs = await getAllBlogs();
    const paths = blogs.map(blog => ({ params: { slug: blog.slug } }));
    return {
        paths: paths,
        fallback: false
    };
}

export async function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;
    let blog = await getBlogBySlug(slug);
    return {
        props: {
            blog: blog,
            notFound: (!blog.hasOwnProperty('title'))
        }
    };
}
