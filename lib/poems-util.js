import { connect, find } from './db-util';

export async function getAllPoems() {
    const client = await connect();
    const poems = await find(client, 'poems', {}, { date: -1 });
    await client.close();
    return poems;
}

export async function getPoemBySlug(slug) {
    const client = await connect();
    const poems = await find(client, 'poems', { slug: slug });
    await client.close();
    return poems[0];
}
