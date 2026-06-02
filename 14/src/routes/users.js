import { generateToken, buildIdGenerator } from "../utils.js";

export default (app) => {
  const users = [];

  const generateId = buildIdGenerator();

  app.get("/users/new", (req, res) => res.view("src/views/users/new"));

  // BEGIN (write your solution here)
  app.post("/users", (req, res) => {
    const user = {
      id: generateId(),
      token: generateToken(),
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim().toLowerCase(),
    };

    users.push(user);
    res.cookie("token", user.token);
    res.redirect(`/users/${user.id}`);
  });

  app.get("/users/:id", (req, res) => {
    const user = users.find(({ id }) => id.toString() === req.params.id);

    if (!user || user.token !== req.cookies.token) {
      return res.status(404).send("User not found");
    }

    return res.view("src/views/users/show", { user });
  });
  // END
};
