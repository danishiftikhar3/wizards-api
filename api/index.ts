import app from '../src';
const { createServer } = require('http');
const { parse } = require('url');

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  req.query = parsedUrl.query;
  app(req, res);
});

export default server;
