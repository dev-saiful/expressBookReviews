const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) {
      users.push({ username: username, password: password });
      return res.status(200).json({ 
        message: "User successfully registered. Now you can login" 
      });
    }
    else
    {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});


const ObjectToArray = (object) => {
  const params = [];
  for (let key in object) {
    params.push(object[key]);
  }
  return params;
};

// Get all book using promise
public_users.get("/", (req, res) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(books);
    }, 2000);
  }).then((books) => res.status(200).json({"books": books}));
});

// Get book detailed based on isbn using Promise
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      let isbnParams = parseInt(req.params.isbn);
      let book;
      for (let isbn in books) {
        if (parseInt(isbn) === isbnParams) {
          book = books[isbn];
        }
      }
      resolve(book);
    }, 2000);
  }).then((book) => res.status(200).json(book));
});

// Get book details based on author using Promise
public_users.get("/author/:author", function (req, res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let authors = ObjectToArray(books);
      let filteredAuthor = authors.filter(
        (book) => book.author === req.params.author
      );
      resolve(filteredAuthor);
    }, 2000);
  }).then((books) => res.status(200).json({"booksbyauthor": books}));
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let titles = ObjectToArray(books);
      let filteredTitle = titles.filter(
        (book) => book.title === req.params.title
      );
      resolve(filteredTitle);
    }, 2000);
  }).then((books) => res.status(200).json({"booksbytitle": books}));
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isbn = req.params.isbn;
      resolve(books[isbn].reviews);
    }, 2000)
  }).then((books)=> res.status(200).json(books));
});

module.exports.general = public_users;
