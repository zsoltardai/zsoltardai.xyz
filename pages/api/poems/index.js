import { v4 as uuid } from 'uuid';
import { getSession } from 'next-auth/client';
import { connect, find, insert } from '../../../lib/db-util';

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

    if (req.method === 'POST') {

        const session = await getSession({ req: req });

        if (!session) {
            res.status(403).json({ message: 'Not authorized!' });
            return;
        }

        const { title, content, date, author } = req.body;

        if (!title || title.trim() === '') {
            res.status(400).json({ message: 'Your request did not contain a valid title!' });
            return;
        }

        if (!content || content.trim() === '') {
            res.status(400).json({ message: 'Your request did not contain a valid content!' });
            return;
        }

        if (!date || date.trim() === '') {
            res.status(400).json({ message: 'Your request did not contain a valid date!' });
            return;
        }

        if (!author || author.trim() === '') {
            res.status(400).json({ message: 'Your request did not contain a valid author!' });
            return;
        }

        const _id = uuid();

        let slug = title.replace(/[^a-zA-Z ]/g, "").toLowerCase().replaceAll(' ', '-');

        const formattedDate = new Date(date).toLocaleDateString();

        let client;

        try {
            client = await connect();
        } catch (error) {
            res.status(500).json({ message: 'Failed to connect to the database!' });
            return;
        }

        try {
            const poems = await find(client, 'poems', { slug: slug });
            if (poems.length > 0) { slug += ('-' + _id); }
        } catch (error) {

        }

        const poem = { _id: _id, title: title, content: content, date: formattedDate,
            author: author, slug: slug, email: session.user.email };

        try {
            await insert(client, 'poems', poem);
        } catch (error) {
            res.status(500).json({ message: 'Failed to insert the document into the collection!' });
            await client.close();
            return;
        }

        res.status(201).json({ message: 'Successfully published the poem!' });
        await client.close();
        return;
    }

    res.status(400).json({ message: 'Only GET and POST requests are allowed!' });
}