import http from 'node:http';

// when using "type": "module" in package.json, we must explicit the extension .js on imports
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

const server = http.createServer(async (req, res) => {

    const { method, url } = req

    // waits the function to execute before go on
    await json(req, res);

    const route = routes.find(route => {
        return route.method === method && route.path === url;
    });

    if (route) {
        return route.handler(req, res);
    }

    return res.writeHead(404).end();
})

// localhost:3333
server.listen(3333);