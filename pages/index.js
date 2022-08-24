import Skills from '../components/home/skills';
import Socials from '../components/home/socials';
import Introduction from '../components/home/introduction';
import FeaturedBlogs from '../components/home/featured-blogs';

export default function Home({ blogs }) {
    return (
      <>
        <Introduction />
        <Skills />
        <FeaturedBlogs featuredBlogs={[]} />
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
