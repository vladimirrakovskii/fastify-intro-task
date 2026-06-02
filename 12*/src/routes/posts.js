import _ from "lodash";

export default (app) => {
  const posts = [];

  // для этого упражнения этого достаточно, но в реальных упражнениях так делать не надо:
  const generateId = () => (posts.length + 1).toString();

  app.get("/posts/:id", (req, res) => {
    const post = posts.find(({ id }) => id === req.params.id);

    if (!post) {
      res.status(404).send("Post not found");
      return;
    }
    res.view("src/views/posts/show", { post });
  });

  app.get("/posts", (req, res) => {
    let page = parseInt(req.query.page || 1, 10);
    const per = 5;
    const chunked = _.chunk(posts, per);
    page = page < 0 ? 1 : page;
    const previousPage = page === 1 ? 1 : page - 1;
    const nextPage = page > chunked.length ? chunked.length : page + 1;

    const data = {
      posts: page <= chunked.length ? chunked[page - 1] : [],
      page,
      previousPage,
      nextPage,
    };

    res.view("src/views/posts/index", data);
  });

  app.post("/posts", (req, res) => {
    const post = {
      title: req.body.title,
      body: req.body.body,
      id: generateId(),
    };

    posts.push(post);

    res.redirect("/posts");
  });

  // BEGIN (write your solution here)
  app.get("/posts/:id/edit", (req, res) => {
    const post = posts.find(({ id }) => id === req.params.id);

    if (!post) {
      res.status(404).send("Post not found");
      return;
    }

    res.view("src/views/posts/edit", { post });
  });

  app.post("/posts/:id", (req, res) => {
    const post = posts.find(({ id }) => id === req.params.id);

    if (!post) {
      res.status(404).send("Post not found");
      return;
    }

    const { title, body } = req.body;
    const errors = {};

    if (!title || title.trim() === "") {
      errors.title = "Название не может быть пустым";
    }

    if (!body || body.trim() === "") {
      errors.body = "Текст не может быть пустым";
    }

    if (Object.keys(errors).length > 0) {
      res.view("src/views/posts/edit", {
        post: { ...post, title, body },
        errors
      });
      return;
    }

    post.title = title.trim();
    post.body = body.trim();

    res.redirect("/posts");
  });

  app.get("/posts/new", (req, res) => {
    res.view("src/views/posts/new", { post: { title: '', body: '' } });
  });
  // END
};
