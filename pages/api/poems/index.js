import { connect, find } from '../../../lib/db-util';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        let client;

        try {
            client = await connect();
        } catch (error) {
            res.status(500).json({ message: 'Failed to connect to the database!' });
            return;
        }

        try {
            const poems = await find(client, 'poems', {}, { date: -1 });
            res.status(200).json({ poems: poems });
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch poems!' });
        }

        await client.close();

        return;
    }

    res.status(400).json({ message: 'Only GET requests are allowed!' });
}