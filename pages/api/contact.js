import { v4 as uuid } from 'uuid';
import { connect, insert } from '../../lib/db-util';

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { email, firstName, lastName, message } = req.body;

        console.log()

        if (!email || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
            res.status(400).json({ message: 'The request did not contain a e-mail address!' });
            return;
        }

        if (!firstName || firstName.trim() === '') {
            res.status(400).json({ message: 'The request did not contain a valid first name!' });
            return;
        }

        if (!lastName || lastName.trim() === '') {
            res.status(400).json({ message: 'The request did not contain a valid last name!' });
            return;
        }

        if (!message || message.trim() === '') {
            res.status(400).json({ message: 'The request did not contain a valid message!' });
            return;
        }

        let client;

        try {
            client = await connect();
        } catch (error) {
            res.status(500).json({ message: 'Failed to connect to the database!' });
            return;
        }

        const contact = {
            _id: uuid(),
            email: email,
            firstName: firstName,
            lastName: lastName,
            message: message,
            date: new Date().toISOString()
        };

        try {
            await insert(client, 'messages', contact);
            res.status(201).json({ message: 'Successfully sent the message!', contact: contact });
        } catch (error) {
            res.status(500).json({ message: 'Failed to insert message to the database!' });
        }

        await client.close();

        return;
    }

    res.status(400).json({ message: 'Only POST requests are allowed!' });
}
