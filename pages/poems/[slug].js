import { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import { getAllPoems, getPoemBySlug } from '../../lib/poems-util';
import styles from '../../styles/poem.module.css';

export default function Poem({ poem }) {
    const { title, content, author, date } = poem;
    const formattedDate = new Date(date).toLocaleDateString('en-US',
        { day: 'numeric', month: 'long', year: 'numeric' });
    return (
        <Fragment>
            <div className={styles.container}>
                <h2>{title}</h2>
                <div className={styles.meta}>
                   <span>
                       <span>By</span>
                       <span className={styles.highlighted}> {author}</span>
                   </span>
                    <span>
                        <span>on</span>
                        <time className={styles.highlighted}> {formattedDate}</time>
                   </span>
                </div>
                <div>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        </Fragment>
    );
}

export async function getStaticPaths() {
    const poems = await getAllPoems();
    const paths = poems.map(poem => ({ params: { slug: poem.slug } }));
    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;
    const poem = await getPoemBySlug(slug);
    return {
        props: {
            poem: poem,
            notFound: (!poem.hasOwnProperty('title'))
        }
    };
}
