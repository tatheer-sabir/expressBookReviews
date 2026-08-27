const express = require('express');

let books = require('./booksdb.js');

let isValid = require('./auth_users.js').isValid;

let users = require('./auth_users.js').users;

const public_users = express.Router();

// Register a new user
public_users.post('/register', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({
      message: 'Username and password required'
    });
  }

  const userExists = users.some(user => user.username === username);

  if (userExists) {
    return res.status(404).json({
      message: 'User already exists'
    });
  }

  users.push({
    username: username,
    password: password
  });

  return res.status(200).json({
    message: 'User successfully registered. Now you can login'
  });
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {

  return res.status(200).send(
    JSON.stringify(books, null, 4)
  );

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {

  const isbn = req.params.isbn;

  return res.status(200).send(
    JSON.stringify(books[isbn], null, 4)
  );

});

// Get book details based on author
public_users.get('/author/:author', (req, res) => {

  const author = req.params.author;

  const matchingBooks = Object.keys(books)
    .filter(key => books[key].author === author)
    .map(key => books[key]);

  return res.status(200).send(
    JSON.stringify(matchingBooks, null, 4)
  );

});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {

  const title = req.params.title;

  const matchingBooks = Object.keys(books)
    .filter(key => books[key].title === title)
    .map(key => books[key]);

  return res.status(200).send(
    JSON.stringify(matchingBooks, null, 4)
  );

});

// Get book review
public_users.get('/review/:isbn', (req, res) => {

  const isbn = req.params.isbn;

  return res.status(200).send(
    JSON.stringify(books[isbn].reviews, null, 4)
  );

});

module.exports.general = public_users;