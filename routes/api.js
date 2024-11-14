/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const DBqueries = require("./queries");
const queries = new DBqueries();

module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      queries.findAllBooks((err, data) => {
        if (err) {
          res.send(err);
        }
        let books = data.map((item) => ({
          comments: item.comments,
          _id: item._id,
          title: item.title || "",
          commentcount: item.comments.length,
          __v: item.__v,
        }));

        res.send(books);
      });
    })

    .post(function (req, res) {
      let title = req.body.title;
      queries.addOneBook(title, (err, data) => {
        if (err) {
          res.send(err);
        }
        res.send({ title: data.title, _id: data._id });
      });
    })

    .delete(function (req, res) {
      // if successful response will be 'complete delete successful'
      queries.deleteAllBooks((err, data) => {
        if (err) {
          res.send(err);
        }
        res.send(data);
      });
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      queries.findOneBook(bookid, (err, data) => {
        if (err) {
          res.send(err);
        }
        const book = {
          _id: data._id,
          title: data.title,
          comments: data.comments,
        };
        res.send(book);
      });
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      queries.updateOneBook(bookid, comment, (err, data) => {
        if (err) {
          res.send(err);
        }
        const book = {
          _id: data._id,
          title: data.title,
          comments: data.comments,
        };
        res.send(book);
      });
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      queries.deleteOneBook(bookid, (err, data) => {
        if (err) {
          res.send(err);
        }
        res.send(data);
      });
    });
};
