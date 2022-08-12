import { connect, find } from '../../../lib/db-util';

export default async function handler(req, res) {
    let client;

    try {
        client = await connect();
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Failed to connect to the database!' });
        return;
    }

    if (req.method === 'GET') {
        try {
            const blogs = await find(client, 'blogs', {}, { date: -1 });
            res.status(200).json({ blogs: blogs });
        }
        catch (error) {
            res.status(500).json({ message: error.message || 'Failed to fetch blogs from the database!' });
        }

        await client.close();
        return;
    }

    if (req.method === 'POST') {
        const { filter } = req.query;

        try {
            const filteredBlogs = await find(client, 'blogs', filter, { date: -1 });
            res.status(200).json({ filteredBlogs: filteredBlogs });
        }
        catch (error) {
            res.status(500).json({ message: error.message || 'Failed to fetch filtered blogs from the database!' });
        }

        await client.close();
        return;
    }

    res.status(400).send({ message: 'Only [\'GET\', \'POST\'] requests are allowed!' });
}
