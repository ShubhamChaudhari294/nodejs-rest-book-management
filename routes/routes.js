module.exports = (app) => {
  const books = require("../controllers/bookController.js");
  var router = require("express").Router();

  router.post("/", books.create);

  router.get("/", books.findAll);

  router.put("/:id", books.update);

  router.delete("/:id", books.delete);

  app.use("/api/books", router);
};
