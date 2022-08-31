import Head from 'next/head';
import BlogsGrid from '../../components/blog/blogs-grid';
import { getAllBlogs } from '../../lib/blogs-util';

export default function Blogs({ blogs }) {
    return (
        <>
            <Head>
                <title>Blogs</title>
                <meta name='description' content='This is a page for all of my blogs.' />
            </Head>
            <BlogsGrid blogs={blogs} />
        </>
    );
}

export async function getStaticProps() {
    const blogs = await getAllBlogs();
    return {
        props: {
            blogs: blogs
        },
        revalidate: 60
    };
}
