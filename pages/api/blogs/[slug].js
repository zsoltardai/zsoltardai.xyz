import {MongoClient} from "mongodb";

export default async function handler(req, res) {
    let client; let message; let blog;
    const ALLOWED = ['GET'];

    if (ALLOWED.includes(req.method)) {
        try {
            client = await MongoClient.connect(process.env.MONGODB);
        } catch (error) {
            message = 'Failed to connect to the database, try again later!';
            res.status(500).send(message);
            return;
        }
    }

    if (req.method === 'GET') {
        const { slug } = req.query;

        try {
            blog = await client.db().collection('blogs').findOne({ slug });
        } catch (error) {
            message = 'Failed to connect to the database, try again later!';
            res.status(500).send(message);
            await client.close();
            return;
        }

        if (!blog) {
            message = 'There is no blog with the provided slug!';
            res.status(404).send(message);
            await client.close();
            return;
        }

        res.status(200).json(blog);
        await client.close();
        return;
    }

    message = 'Only GET requests are allowed!';
    res.status(405).send(message);
}
