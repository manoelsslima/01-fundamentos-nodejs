import http from 'node:http';
import { randomUUID } from 'node:crypto';
// when using "type": "module" in package.json, we must explicit the extension .js on imports
import { json } from './middlewares/json.js';
import { Database } from './database.js';

const database = new Database();

const server = http.createServer(async (req, res) => {

    const { method, url } = req

    // waits the function to execute before go on
    await json(req, res);

    if (method === 'GET' && url === '/users') {
        const users = database.select('users');

        return res.end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {

        const { name, email } = req.body;

        const user = {
            id: randomUUID(),
            name, // same as name = name or name = body.name
            email // same as email = email or email = body.email
        }

        database.insert('users', user);

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end();
})

// localhost:3333
server.listen(3333);