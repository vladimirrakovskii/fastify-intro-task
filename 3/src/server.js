import _ from "lodash";
import fastify from "fastify";
import getUsers from "./utils.js";

export default () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.get('/users', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const per = parseInt(req.query.per) || 5;
    let startIndex = (page - 1) * per;
    let endIndex = startIndex + per;
    res.send(users.slice(startIndex, endIndex));
  });
  // END

  return app;
};
