import _ from "lodash";
import generatePosts from "../utils.js";

export default (app) => {
  const posts = generatePosts();

  // BEGIN (write your solution here)
  app.get("/posts/:id", (req, res) => {
    const post = posts.find((item) => item.id === req.params.id);

    if (!post) {
      res.status(404).send("Page not found");
      return;
    }

    res.view("src/views/posts/show", { post });
  });

  app.get("/posts", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 5;
    const totalPages = Math.ceil(posts.length / perPage);

    let currentPage = Math.max(1, page);
    if (currentPage > totalPages) {
      currentPage = totalPages + 1;
    }

    const chunks = _.chunk(posts, perPage);
    const currentPosts = chunks[currentPage - 1] || [];

    res.view("src/views/posts/index", {
      posts: currentPosts,
      currentPage: currentPage,
      totalPages: totalPages,
      hasPrevious: currentPage > 1,
      hasNext: currentPage < totalPages,
      previousPage: currentPage - 1,
      nextPage: currentPage + 1
    });
  });
  // END
};
