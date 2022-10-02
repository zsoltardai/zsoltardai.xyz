import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import renderer from '../../lib/renderer';
import getBlog from "../../lib/blogs/getBlog";
import styles from '../../styles/blog.module.css';

export default function Blog({ blog }) {
    const { title, content, author, date } = blog;
    const formattedDate = new Date(date).toLocaleDateString('en-US',
        { day: 'numeric', month: 'long', year: 'numeric' });
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={content} />
            </Head>
            <div className={styles.container}>
                <h1>{title}</h1>
                <div className={styles.meta}>
                    <span>
                        <span>Posted by </span>
                        <span className={styles.highlighted}>
                            {author.firstname} {author.lastname}
                        </span>
                    </span>
                    <span>
                        <span>on </span>
                        <time className={styles.highlighted}>
                            {formattedDate}
                        </time>
                    </span>
                </div>
                <div>
                    <ReactMarkdown
                        components={renderer}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const blogs = await getBlog();
    const paths = blogs.map(blog => ({ params: { slug: blog.slug } }));
    return {paths: paths,fallback: false};
}

export async function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;
    let blog = await getBlog(slug);
    return {props: {blog: blog, notFound: !blog}, revalidate: 60};
}
