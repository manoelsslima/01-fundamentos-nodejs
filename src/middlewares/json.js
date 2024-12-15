export async function json(req, res) {

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

    res.setHeader('Content-Type', 'application/json');
}