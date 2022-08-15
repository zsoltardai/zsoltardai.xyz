import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connect } from '../../../lib/db-util';
import { verify } from '../../../lib/auth-util';

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [Providers.Credentials({
        async authorize(credentials) {
            const client = await connect();

            const db = client.db();

            const usersCollection  = db.collection('users');

            const { email, password } = credentials;

            const user = await usersCollection.findOne({ email: email });

            await client.close();

            if (!user) throw new Error('No user found!');

            const valid = await verify(password, user.password);

            if (!valid) throw new Error('The provided password is invalid!');

            return { email: user.email };
        }
    })]
});
