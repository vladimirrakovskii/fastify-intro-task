export default (app, db) => {
  app.get("/products/new", (req, res) => {
    res.view("src/views/products/new");
  });

  // BEGIN (write your solution here)
  app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * from products WHERE id = ${id}`, (err, data) => {
      const templateData = {
        product: data,
        err,
      };
      res.view("src/views/products/show", templateData);
    });
  });
  app.get("/products", (req, res) => {
    db.all(`SELECT * from products`, (err, data) => {
      const templateData = {
        products: data,
        err
      };
      res.view("src/views/products/index", templateData);
    });
  });
  app.post("/products", (req, res) => {
    const {title, description, price} = req.body;
    const stmt = db.prepare('INSERT INTO products (title, description, price) VALUES (?, ?, ?)');
    stmt.run([title, description, price], function (err) {
        if (err) {
          const templateData = {
            err,
            product: {title, description, price},
          };
          res.view("src/views/products/show", templateData);
          return;
        }
        res.redirect("/products");
    })
  })
  // END
};
