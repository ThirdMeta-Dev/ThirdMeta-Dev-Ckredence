import { createServer } from 'node:http';

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 3000);

const server = createServer((request, response) => {
  const pathname = request.url?.split('?', 1)[0];
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');

  if (pathname !== '/api/health') {
    response.writeHead(404).end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end(
      JSON.stringify({ error: 'Method not allowed' }),
    );
    return;
  }

  response.writeHead(200).end(JSON.stringify({ status: 'ok' }));
});

server.listen(port, host, () => {
  const address = server.address();
  const displayHost = address.family === 'IPv6' ? `[${address.address}]` : address.address;
  console.log(`Ckredence Wealth API listening at http://${displayHost}:${address.port}`);
});
