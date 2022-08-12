import { Fragment } from 'react';
import Skills from '../components/home/skills';
import Socials from '../components/home/socials';
import Introduction from '../components/home/introduction';
import FeaturedBlogs from '../components/home/featured-blogs';

export default function Home({ blogs }) {
    return (
      <Fragment>
        <Introduction />
        <Skills />
        <FeaturedBlogs featuredBlogs={[]} />
        <Socials />
      </Fragment>
    );
}

export async function getStaticProps() {
    return {
        props: {
            blogs: []
        }
    };
}
