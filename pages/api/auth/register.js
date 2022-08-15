import { connect, find, insert, _delete } from '../../../lib/db-util';
import { hash } from '../../../lib/auth-util';

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { email, password, code } = req.body;

        if (!email || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
            res.status(400).json({ message: 'The provided email address was not valid!' });
            return;
        }

        if (!password || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(password)) {
            res.status(400).json({ message: 'The provided password was not valid!' });
            return;
        }

        let client;

        try {
            client = await connect();
        } catch (error) {
            res.status(500).json({ message: 'Failed to connect to the database!' });
            return;
        }

        let _code;

        try {
            const codes = await find(client, 'codes', { code: code });
            _code = codes[0];
        } catch(error) {
            res.status(500).json({ message: 'Failed to fetch codes from the collection!' });
            await client.close();
            return;
        }

        if (!_code) {
            res.status(403).json({ message: 'The registration code you provided was invalid!' });
            await client.close();
            return;
        }

        try {
            await _delete(client, 'codes', _code);
        } catch(error) {
            res.status(500).json({ message: 'Failed to delete the code from the collection!' });
            await client.close();
            return;
        }

        let user;

        try {
            const users = await find(client, 'users', { email: email });
            user = users[0];
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch users from the collection!' });
            await client.close();
            return;
        }

        if (user) {
            res.status(409).json({ message: 'User already exists with this email address!' });
            await client.close();
            return;
        }

        const hashedPassword = hash(password);

        user = { email: email, password: hashedPassword };

        try {
            await insert(client, 'users',  user);
        } catch (error) {
            res.status(500).json({ message: 'Failed to insert the user to the collection!' });
            await client.close();
            return;
        }

        res.status(201).json({ message: 'User have been created successfully!' });
        await client.close();
        return;
    }

    res.status(400).json({ message: 'Only POST requests are allowed!' });
}
