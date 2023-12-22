const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json'); 
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3005;

server.use(middlewares);
server.use('/api', router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});