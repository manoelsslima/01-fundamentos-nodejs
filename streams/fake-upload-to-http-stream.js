import { Readable } from 'node:stream'
import { fetch } from 'cross-fetch';

class OneToHundredStream extends Readable {

    index = 1;

    _read() {
        const i = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));

                this.push(buf);
            }
        }, 1000);
    }
}

// open connection with server and send data partially
// that is nice for big payloads
fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
}) 