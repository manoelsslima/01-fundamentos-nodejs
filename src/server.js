import http from 'node:http';

const users = [];

const server = http.createServer((req, res) => {

    const { method, url } = req

    if (method === 'GET' && url === '/users') {
        return res
        .setHeader('Content-Type', 'application/json')
        .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com'
        })
        return res.end('Criação de usuários')
    }

    return res.end('Hello World');
})

// localhost:3333
server.listen(3333);