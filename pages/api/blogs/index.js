import getBlog from "../../../lib/blogs/getBlog";
import getSession from "../../../lib/auth/getSession";
import createSlug from "../../../lib/strings/createSlug";
import connect from "../../../lib/db/connect";
import crypto from "crypto";

export default async function handler(req, res) {
    let client; let message;

    if (req.method === 'GET') {
        const blogs = await getBlog();
        res.status(200).json(blogs);
        return;
    }

    if (req.method === 'POST') {
        const creator = getSession({req, res});

        if (!creator) {
            message = 'Unauthorized!';
            res.status(403).send(message);
            return;
        }

        delete creator['iat'];
        delete creator['exp'];

        const { title, excerpt, content, date } = req.body;

        if (!title || title.trim() === '') {
            message = 'The provided title was invalid!';
            res.status(400).send(message);
            return;
        }

        if (!excerpt || excerpt.trim() === '') {
            message = 'The provided excerpt was invalid!';
            res.status(400).send(message);
            return;
        }

        if (!content || content.trim() === '') {
            message = 'The provided content was invalid!';
            res.status(400).send(message);
            return;
        }

        if (!(/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z$/).test(date)) {
            message = 'The provided date was invalid!';
            res.status(400).send(message);
            return;
        }

        const slug = createSlug(title);

        const id = crypto.randomBytes(20).toString('hex');

        const blog = {
            _id: id,
            slug,
            title,
            excerpt,
            content,
            date,
            author: creator,
        };

        client = await connect();

        if (!client) {
            message = 'Failed to connect to the database, try again later!';
            res.status(500).send(message);
            return;
        }

        try {
            const blog = await client.db().collection('blogs').findOne({slug});
            if (blog) {
                message = 'A blog already exists with this title!';
                res.status(409).send(message);
                await client.close();
                return;
            }
        } catch (error) {
            message = 'Failed to connect to the database, try again later!';
            res.status(500).send(message);
            await client.close();
            return;
        }

        try {
            await client.db().collection('blogs').insertOne(blog);
        } catch (error) {
            message = 'Failed to insert blog to the collection, try again later!';
            res.status(500).send(message);
            await client.close();
            return;
        }

        res.status(201).json(blog);
        await client.close();
        return;
    }

    message = 'Only GET and POST requests are allowed!';
    res.status(405).send(message);
}
