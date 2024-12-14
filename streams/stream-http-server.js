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
const server = http.createServer((req, res) => {

    return req
    .pipe(new InverseNumberStream()) // read
    .pipe(res); // redirect to write
});

server.listen(3334);