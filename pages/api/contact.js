import connect from "../../lib/db/connect";
import crypto from "crypto";

export default async function handler(req, res) {
    let client; let msg;
    if (req.method === 'POST') {

        const { email, firstName, lastName, message } = req.body;

        if (!email || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
            msg = 'The request did not contain a e-mail address!';
            res.status(400).send(msg);
            return;
        }

        if (!firstName || firstName.trim() === '') {
            msg = 'The request did not contain a valid first name!';
            res.status(400).send(msg);
            return;
        }

        if (!lastName || lastName.trim() === '') {
            msg = 'The request did not contain a valid last name!';
            res.status(400).send(msg);
            return;
        }

        if (!message || message.trim() === '') {
            msg = 'The request did not contain a valid message!';
            res.status(400).send(msg);
            return;
        }

        const id = crypto.randomBytes(20).toString('hex');

        client = await connect();

        const contact = {
            _id: id,
            email,
            firstName,
            lastName,
            message,
            date: new Date().toISOString()
        };

        try {
            await client.db().collection('messages').insertOne(contact);
        } catch (error) {
            msg = 'Failed to insert message to the database!';
            res.status(500).send(msg);
            await client.close();
            return;
        }

        res.status(201).json(contact);
        await client.close();
        return;
    }

    msg = 'Only POST requests are allowed!';
    res.status(400).json(msg);
}
