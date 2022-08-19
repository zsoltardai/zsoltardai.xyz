import BlogsGrid from '../../components/blog/blogs-grid';
import { getAllBlogs } from '../../lib/blogs-util';

export default function Blogs({ blogs }) { return <BlogsGrid blogs={blogs} />; }

export async function getStaticProps() {
    const blogs = await getAllBlogs();
    return {
        props: {
            blogs: blogs
        },
        revalidate: 60
    };
}
