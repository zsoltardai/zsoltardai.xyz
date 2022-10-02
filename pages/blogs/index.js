import BlogsGrid from '../../components/blog/blogs-grid';
import getBlog from "../../lib/blogs/getBlog";
import Head from 'next/head';

export default function Blogs({blogs}) {
    return (
      <>
        <Head>
          <title>
            Blogs
          </title>
          <meta
            name='description'
            content='This is a page for all of my blogs.'
          />
        </Head>
        <BlogsGrid
          blogs={blogs}
        />
      </>
    );
}

export async function getStaticProps() {
    const blogs = await getBlog();
    return {props: {blogs}, revalidate: 60};
}
