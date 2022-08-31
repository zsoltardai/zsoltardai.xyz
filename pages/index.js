import Head from 'next/head';
import Skills from '../components/home/skills';
import Socials from '../components/home/socials';
import Introduction from '../components/home/introduction';
import FeaturedBlogs from '../components/home/featured-blogs';

export default function Home({ blogs }) {
    return (
      <>
        <Head>
            <title>Home</title>
            <meta name='description' content='Hi, my name is Zsolt, and I&apos;m a frontend developer.' />
        </Head>
        <Introduction />
        <Skills />
        <FeaturedBlogs featuredBlogs={blogs} />
        <Socials />
      </>
    );
}

export async function getStaticProps() {
    return {
        props: {
            blogs: []
        }
    };
}
