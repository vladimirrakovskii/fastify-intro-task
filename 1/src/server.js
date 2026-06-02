import fastify from "fastify";

export default () => {
  const app = fastify();
  // BEGIN (write your solution here)
  app.get('/', (req, res) => {
    res.send('Welcome to Fastify!');
  })
  // END
  return app;
};
