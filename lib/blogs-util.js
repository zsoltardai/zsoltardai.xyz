import { connect, find } from './db-util';

export async function getAllBlogs() {
    const client = await connect();
    const blogs = await find(client, 'blogs', {}, { date: -1 });
    await client.close();
    return blogs;
}

export async function getBlogBySlug(slug) {
    const client = await connect();
    const blogs = await find(client, 'blogs', { slug: slug });
    await client.close();
    return blogs[0];
}
