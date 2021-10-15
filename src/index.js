const http = require('http');
const { URL } = require('url');
const { filter } = require('./routes');

const routes = require('./routes');

const server = http.createServer((request, response) => {
  const { method } = request;
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  console.log(`Request method: ${method} | Endpoint: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split('/').filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === method
  ));

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };
    
    route.handler(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${method} ${parsedUrl.pathname}`);
  };

});

server.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'));
