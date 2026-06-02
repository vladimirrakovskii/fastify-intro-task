import { buildIdGenerator } from "../utils.js";

export default (app) => {
  const users = [];

  const generateId = buildIdGenerator();

  app.get("/users/new", { name: "newUser" }, (req, res) =>
    res.view("src/views/users/new")
  );

  app.get("/users", { name: "users" }, (req, res) => {
    const { term } = req.query;
    let currentUsers = users;

    if (term) {
      currentUsers = users.filter((user) =>
        user.username.toLowerCase().includes(term.toLowerCase())
      );
    }
    res.view("src/views/users/index", { users: currentUsers });
  });

  app.post("/users", (req, res) => {
    const user = {
      userName: req.body.userName,
      email: req.body.email,
      id: generateId(),
    };

    users.push(user);

    // BEGIN (write your solution here)
    res.redirect(app.reverse("user", {id: user.id}));
    // END
  });

  app.get("/users/:id", { name: "user" }, (req, res) => {
    const user = users.find((item) => item.id === req.params.id);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.view("src/views/users/show", { user });
  });
};
