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
};
