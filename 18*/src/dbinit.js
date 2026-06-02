export default (db) => {
  // BEGIN (write your solution here)
    db.serialize(() => {
      db.run(`
        CREATE TABLE products(
            id INTEGER PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            price INTEGER NOT NULL
        );
      `);
  })
  // END
};
