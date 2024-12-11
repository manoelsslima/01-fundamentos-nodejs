import http from 'node:http';

const server = http.createServer((req, res) => {
    return res.end('Hello World');
})

// localhost:3333
server.listen(3333);