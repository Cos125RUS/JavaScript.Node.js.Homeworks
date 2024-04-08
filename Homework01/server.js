const http = require('http');

const port = 3000;

const head = { 'Content-Type': 'text/html; charset=utf-8' };

const homeHref = `<a href="http://localhost:${port}/">About</a>`;
const aboutHref = `<a href="http://localhost:${port}/about">Home</a>`;
const notFound = '<h1>Not Found</h1>';

let homePageCounter = 0;
let aboutPageCounter = 0;
let notFoundPageCounter = 0;

const server = http.createServer((request, response) => {
    if(request.url === '/') {
        response.writeHead(200, head);
        response.end(aboutHref);
        console.log(`${++homePageCounter} views Home Page`);
    } else if(request.url === '/about') {
        response.writeHead(200, head);
        response.end(homeHref);
        console.log(`${++aboutPageCounter} views About Page`);
    } else {
        response.writeHead(404, head);
        response.end(notFound);
        console.log(`${++notFoundPageCounter} people don't know what they wonted`);
    }
}).listen(port, () => console.log(`Server started on port: ${port}`));