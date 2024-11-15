/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  // test("#example Test GET /api/books", function (done) {
  //   chai
  //     .request(server)
  //     .get("/api/books")
  //     .end(function (err, res) {
  //       assert.equal(res.status, 200);
  //       assert.isArray(res.body, "response should be an array");
  //       assert.property(res.body[0], "commentcount", "Books in array should contain commentcount");
  //       assert.property(res.body[0], "title", "Books in array should contain title");
  //       assert.property(res.body[0], "_id", "Books in array should contain _id");
  //       done();
  //     });
  // });
  /*
   * ----[END of EXAMPLE TEST]----
   */

  suite("Routing tests", function () {
    suite("POST /api/books with title => create book object/expect book object", function () {
      test("Test POST /api/books with title", function (done) {
        chai
          .request(server)
          .post("/api/books")
          .send({ title: "La Livrea del Levriero Viola e Nero" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, "response should be an object");
            assert.property(res.body, "title", "Books in array should contain title");
            assert.property(res.body, "_id", "Books in array should contain _id");
            done();
          });
      });

      test("Test POST /api/books with no title given", function (done) {
        chai
          .request(server)
          .post("/api/books")
          .send({})
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(
              res.text,
              "missing required field title",
              `response should be equal to "missing required field title"`
            );
            done();
          });
      });
    });

    suite("GET /api/books => array of books", function () {
      test("Test GET /api/books", function (done) {
        chai
          .request(server)
          .get("/api/books")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, "response should be an array");
            assert.property(
              res.body[0],
              "commentcount",
              "Books in array should contain commentcount"
            );
            assert.property(res.body[0], "title", "Books in array should contain title");
            assert.property(res.body[0], "_id", "Books in array should contain _id");
            done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", function () {
      test("Test GET /api/books/[id] with id not in db", function (done) {
        chai
          .request(server)
          .get("/api/books/fe23ef56ab35ab45ab45ab45")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(
              res.text,
              "no book exists",
              `response should be equal to "no book exists"`
            );
            done();
          });
      });

      test("Test GET /api/books/[id] with valid id in db", function (done) {
        chai
          .request(server)
          .post("/api/books")
          .send({ title: "A test book to test the functionalities" })
          .end(function (err, res) {
            const newId = res.body._id;
            chai
              .request(server)
              .get(`/api/books/${newId}`)
              .end(function (err, res) {
                assert.equal(res.status, 200),
                  assert.isObject(res.body, "response should be an object");
                assert.property(res.body, "_id", "response should contain an '_id' property");
                assert.property(res.body, "title", "response should contain a 'title' property");
                assert.property(
                  res.body,
                  "comments",
                  "response should contain a 'comments' property"
                );
                assert.isArray(res.body.comments, "the comments property should be an array");
                done();
              });
          });
      });
    });

    suite("POST /api/books/[id] => add comment/expect book object with id", function () {
      test("Test POST /api/books/[id] with comment", function (done) {
        chai
          .request(server)
          .post("/api/books")
          .send({ title: "A test book to test posting a comment" })
          .end(function (err, res) {
            const newId = res.body._id;
            chai
              .request(server)
              .post(`/api/books/${newId}`)
              .send({ comment: "This is the comment" })
              .end(function (err, res) {
                assert.equal(res.status, 200),
                  assert.isObject(res.body, "response should be an object");
                assert.property(res.body, "_id", "response should contain an '_id' property");
                assert.property(res.body, "title", "response should contain a 'title' property");
                assert.property(
                  res.body,
                  "comments",
                  "response should contain a 'comments' property"
                );
                assert.isArray(res.body.comments, "the comments property should be an array");
                done();
              });
          });
      });

      test("Test POST /api/books/[id] without comment field", function (done) {
        chai
          .request(server)
          .post("/api/books")
          .send({ title: "A test book to test posting an empty comment" })
          .end(function (err, res) {
            const newId = res.body._id;
            chai
              .request(server)
              .post(`/api/books/${newId}`)
              .send({})
              .end(function (err, res) {
                assert.equal(res.status, 200),
                  assert.equal(
                    res.text,
                    "missing required field comment",
                    `response should be equal to "missing required field comment"`
                  );
                done();
              });
          });
      });

      test("Test POST /api/books/[id] with comment, id not in db", function (done) {
        chai
          .request(server)
          .post("/api/books/fe23ef56ab35ab45ab45ab45")
          .send({ comment: "Ok, but the id is not correct" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(
              res.text,
              "no book exists",
              `response should be equal to "no book exists"`
            );
            done();
          });
      });
    });

    suite("DELETE /api/books/[id] => delete book object id", function () {
      test("Test DELETE /api/books/[id] with valid id in db", function (done) {
        chai
          .request(server)
          .post("/api/books")
          .send({ title: "A test book to test deleting a book" })
          .end(function (err, res) {
            const newId = res.body._id;
            chai
              .request(server)
              .delete(`/api/books/${newId}`)
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(
                  res.text,
                  "delete successful",
                  `response should be equal to "delete successful"`
                );
                done();
              });
          });
      });

      test("Test DELETE /api/books/[id] with  id not in db", function (done) {
        chai
          .request(server)
          .delete(`/api/books/fe23ef56ab35ab45ab45ab45`)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(
              res.text,
              "no book exists",
              `response should be equal to "no book exists"`
            );
            done();
          });
      });
    });
  });
});
