const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
// define a new router
const router = new express.Router();

// Route to create a new User - SIGN UP USER
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    // saves to database
    await user.save();
    // generate a token for the saved user
    const token = await User.generateAuthToken();
    res.status(201).send({ user: token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route that allows users to login - LOG IN USER
// login request generates and stores an authenication token and sends it back to client
router.post('/users/login', async (req, res) => {
  try {
    // validating the credentials that are provided
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    // function that returns tokens and is sent to the user
    const token = await user.generateAuthToken();
    // send back object with two properties - user and token
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

// Route that allows user to log out - LOG OUT
router.post('/users/logout', auth, async (req, res) => {
  try {
    // removing a given item from the tokens array - using array filter method
    // set tokens array to filtered version of itself
    req.user.token = req.user.token.filter((token) => {
      return token.token !== req.token;
    });

    // saves to database
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// Route handler to allow user to log out of ALL sessions - LOG OUT ALL
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    // wiping the tokens array - set to empty array
    req.user.tokens = [];
    // save to database
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// Route handler that allows user to get profile when they are authenicated
router.get('/users/me', auth, async (req, res) => {
  // send back user profile
  res.send(req.user);
});

// Route handler to update an individual user by ID
router.patch('/users/me', auth, async (req, res) => {
  // Error handling - making sure the user is using the operation correctly
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    // if something goes wrong - like a validation issue
    res.status(400).send(error);
  }
});

// Route handler to allow logged in user to delete thier own user profile - REMOVE ACCOUNT
router.delete('/users/me', auth, async (req, res) => {
  try {
    // removing the user who is authenicated
    await req.user.remove();

    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

// export the router to be used
module.exports = router;
