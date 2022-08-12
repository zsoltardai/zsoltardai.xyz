import { connect, find } from '../../../lib/db-util';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { slug } = req.query;

        let client;

        try {
            client = await connect();
        }
        catch (error) {
            res.status(500).json({ message: error.message || 'Failed to connect to the database!' });
            return;
        }

        try {
            const blogs = await find(client, 'blogs', { slug: slug }, { date: -1 });

            if (!blogs || blogs.length !== 1) {
                res.status(404).json({ message: 'The requested resource is not found!' });
                await client.close();
                return;
            }

            const blog = blogs[0];

            res.status(200).json({ blog: blog });
        }
        catch (error) {
            res.status(500).json({ message: error.message || 'Failed to fetch blogs from the database!' });
        }

        await client.close();
        return;
    }

    res.status(400).json({ message: 'Only GET requests are allowed!' });
}
