import { randomUUID } from 'node:crypto';
import { Database } from './database.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users');
            return res.end(JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const { name, email } = req.body;

            const user = {
                id: randomUUID(),
                name, // same as name = name or name = body.name
                email // same as email = email or email = body.email
            }

            database.insert('users', user);

            return res.writeHead(201).end()
        }
    },
]