const express = require('express');
const axios = require('axios');

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

// Get all books
public_users.get('/', async (req, res) => {

  try {

    const response = await axios.get('http://localhost:5000/');

    return res.status(200).json(response.data);

  } catch (error) {

    return res.status(500).json({
      message: 'Error retrieving books'
    });

  }

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {

  const isbn = req.params.isbn;

  try {

    const response = await axios.get(
      `http://localhost:5000/isbn/${isbn}`
    );

    return res.status(200).json(response.data);

  } catch (error) {

    return res.status(404).json({
      message: 'Book not found'
    });

  }

});

// Get books based on author
public_users.get('/author/:author', async (req, res) => {

  const author = req.params.author;

  try {

    const response = await axios.get(
      `http://localhost:5000/author/${author}`
    );

    return res.status(200).json(response.data);

  } catch (error) {

    return res.status(404).json({
      message: 'No books found for this author'
    });

  }

});

// Get books based on title
public_users.get('/title/:title', async (req, res) => {

  const title = req.params.title;

  try {

    const response = await axios.get(
      `http://localhost:5000/title/${title}`
    );

    return res.status(200).json(response.data);

  } catch (error) {

    return res.status(404).json({
      message: 'No books found with this title'
    });

  }

});

// Get book review
public_users.get('/review/:isbn', async (req, res) => {

  const isbn = req.params.isbn;

  try {

    const response = await axios.get(
      `http://localhost:5000/review/${isbn}`
    );

    return res.status(200).json(response.data);

  } catch (error) {

    return res.status(404).json({
      message: 'Book review not found'
    });

  }

});

module.exports.general = public_users;
