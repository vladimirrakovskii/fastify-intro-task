import fastify from "fastify";
import getCompanies from "./utils.js";

export default () => {
  const app = fastify();

  const companies = getCompanies();

  // BEGIN (write your solution here)
  app.get('/companies/:id', (req, res) => {
    const { id } = req.params;
    const company = companies.find((company) => company.id === id);
    if (!company) {
      res.code(404).send('Company not found');
    }
    else {
      res.send(company);
    }
  });
  // END

  return app;
};
