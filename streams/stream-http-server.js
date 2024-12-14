import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;

        console.log(transformed);

        callback(null, Buffer.from(String(transformed)));
    }
}

// All Node.js ports (in and out) are streams. Thus, requests and responses are streams.
// req => ReadableStream
// res => WritableStream
const server = http.createServer(async(req, res) => {

    const buffers = [];

    // waits until the full content is uploaded. Always you use await, the superior hierarchical
    // function must be async
    for await(const chunk of req) { // traverse all stream
        buffers.push(chunk);
    }

    // executed after the await waits the full content is uploaded
    const fullStreamContent = Buffer.concat(buffers).toString();

    console.log(fullStreamContent);

    return res.end(fullStreamContent);


    // return req
    // .pipe(new InverseNumberStream()) // read
    // .pipe(res); // redirect to write
});

server.listen(3334);