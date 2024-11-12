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
};
