import { User } from '../models/user.js';

// function to create a new album - NEW USER
export const newUser = async (req, res) => {
  const album = User.build(req.body);

  try {
    await album.save();
    res.status(201).send(album);
  } catch (error) {
    res.status(400).send(error);
  }
};

// function to fetch all users from database - ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users) {
      return res.status(404).send();
    }

    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
};

// function to fetch invidual user by id = USER BY ID
export const getUserById = async (req, res) => {
  // converts id string to integer
  const id = parseInt(req.params.id);

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
};

// function to update user by id - UPDATE USER
export const updateUserById = async (req, res) => {
  // convert id string to integer
  const id = parseInt(req.params.id);

  try {
    const user = await User.update(req.body, {
      where: {
        id: id,
      },
    });

    if (!user) {
      res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
};

// function to delete user by id - DELETE USER
export const deleteUserById = async (req, res) => {
  // convert string to integer
  const id = parseInt(req.params.id);

  try {
    const user = await User.destroy({
      where: {
        id: id,
      },
    });

    if (!user) {
      res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
};
