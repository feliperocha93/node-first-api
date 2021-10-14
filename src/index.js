const http = require('http');

const users = require('./mocks/users');

const server = http.createServer((request, response) => {
  const {method, url} =  request;
  console.log(`Request method: ${method} | Endpoint: ${url}`)

  if (url === '/users' && method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(users));
  } else {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${method} ${url}`);
  }

});

server.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'));