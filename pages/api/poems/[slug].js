import {MongoClient} from "mongodb";
import getPoem from "../../../lib/poems/getPoem";

export default async function handler(req, res) {
    let client; let message;
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

        const poem = await getPoem(slug);

        if (!poem) {
            message = 'There is no poem with the provided slug!';
            res.status(404).send(message);
            await client.close();
            return;
        }

        res.status(200).json(poem);
        await client.close();
        return;
    }

    message = 'Only GET requests are allowed!';
    res.status(405).send(message);
}
