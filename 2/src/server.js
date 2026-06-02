import fastify from "fastify";

export const data = {
  phones: ["+12345678", "3434343434", "234-56-78"],
  domains: ["example.com", "yandex.ru"],
};

export default () => {
  const app = fastify();

  // BEGIN (write your solution here)
  app.get('/phones', (req, res) => {
    res.send(data.phones);
  });
  app.get('/domains', (req, res) => {
    res.send(data.domains);
  });
  // END

  return app;
};
