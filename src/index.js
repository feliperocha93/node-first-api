const http = require('http');

const routes = require("./routes");

const server = http.createServer((request, response) => {
  const { method, url } = request;
  console.log(`Request method: ${method} | Endpoint: ${url}`)

  const route = routes.find((routeObj) => (
    routeObj.endpoint === url && routeObj.method === method
  ))

  if (route) {
    route.handler(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${method} ${url}`);
  }
});

server.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'));
