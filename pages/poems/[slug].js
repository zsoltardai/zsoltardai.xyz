import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import getPoem from "../../lib/poems/getPoem";
import styles from '../../styles/poem.module.css';

export default function Poem({ poem }) {
    const { title, content, author, date } = poem;
    const formattedDate = new Date(date).toLocaleDateString('en-US',
        { day: 'numeric', month: 'long', year: 'numeric' });
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={content} />
            </Head>
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
        </>
    );
}

export async function getStaticPaths() {
    const poems = await getPoem();
    const paths = poems.map(poem => ({ params: { slug: poem.slug } }));
    return { paths: paths, fallback: false };
}

export async function getStaticProps(context) {
    const { slug } = context.params;
    const poem = await getPoem(slug);
    if (poem) return {props: { poem: poem, notFound: !poem.title }, revalidate: 60};
    return {props: {}};
}
