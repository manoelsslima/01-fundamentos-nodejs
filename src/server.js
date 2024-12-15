import http from 'node:http';

const users = [];

const server = http.createServer(async (req, res) => {

    const { method, url } = req

    const buffers = [];

    // waits until the full content is uploaded. Always you use await, the superior hierarchical
    // function must be async
    for await(const chunk of req) { // traverse all stream
        buffers.push(chunk);
    }

    try {
        // executed after the await waits the full content is uploaded
        // JSON.parse - transforms a string (with json format) in a json object
        req.body = JSON.parse(Buffer.concat(buffers).toString()); // creates a property called body in req object
    } catch {
        req.body = null;
    }

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {

        const { name, email } = req.body;

        users.push({
            id: 1,
            name, // same as name = name or name = body.name
            email // same as email = email or email = body.email
        })
        return res
            .writeHead(201)
            .end()
    }

    return res
        .writeHead(404)
        .end();
})

// localhost:3333
server.listen(3333);