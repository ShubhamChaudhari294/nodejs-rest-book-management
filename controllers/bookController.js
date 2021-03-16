const db = require("../models");
const Books = db.books;

exports.create = (req, res) => {
  var messages = [];
  req.body.title ? '' : messages.push('Title Can not be empty');
  req.body.author ? '' : messages.push('Author Can not be empty')
  req.body.isbn ? '' : messages.push('Isbn Can not be empty')
  if (messages.length > 0) {
      res.status(400).send(messages);
      return;
  }
  const book = new Books({
    author: req.body.author,
    title: req.body.title,
    isbn: req.body.isbn,
    releaseDate: req.body.releaseDate,
  });

  book
    .save(book)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while creating the Book.",
      });
    });
};

exports.findAll = (req, res) => {
  Books.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while retrieving books.",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data can not be empty!",
    });
  }

  const id = req.params.id;

  Books.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating book with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Books.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Book with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Book was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id
      });
    });
};
