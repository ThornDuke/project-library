const bookModel = require("./schema");

module.exports = function queries() {
  this.findAllBooks = (done) => {
    bookModel.find({}, (err, data) => {
      if (err) {
        done(err);
      } else {
        done(null, data);
      }
    });
  };

  this.findOneBook = (id, done) => {
    bookModel.findById(id, (err, data) => {
      if (err) {
        done(err);
      } else {
        done(null, data);
      }
    });
  };

  this.addOneBook = (title, done) => {
    if (!title) {
      done("missing required field title");
      return;
    }

    let book = new bookModel();
    book.title = title;
    book.save((err, data) => {
      if (err) {
        done(err);
      } else {
        done(null, data);
      }
    });
  };

  this.updateOneBook = (id, comment, done) => {
    bookModel.findById(id, (err, data) => {
      if (err) {
        done(err);
      } else {
        let comments = data.comments;
        comments.push(comment);
        bookModel.updateOne(
          { _id: id },
          { comments: comments },
          (err, updatedData, alpha, beta, gamma) => {
            if (err) {
              done(err);
            } else {
              done(null, data);
            }
          }
        );
      }
    });
  };

  this.deleteOneBook = (id, done) => {
    bookModel.deleteOne({ _id: id }).then((res) => {
      if (res.ok != 1) {
        done("an error occurred while deleting a book");
      } else {
        done(null, "delete successful");
      }
    });
  };

  this.deleteAllBooks = (done) => {
    bookModel.deleteMany({}).then((res) => {
      if (res.ok != 1) {
        done("an error occurred while deleting the books");
      } else {
        done(null, "complete delete successful");
      }
    });
  };
};
