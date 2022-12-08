import { Router } from 'express';

const router = new Router();

import {
  newUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/user.js';

// Route to create a new user - NEW USER
router.post('/api/users', newUser);

// Route to fetch all users - GET ALL USERS
router.get('/api/users', getUsers);

// Route to fetch individual user by id - GET USER BY ID
router.get('/api/users/:id', getUserById);

// Route handler to update an existing user - UPDATE USER BY ID
router.patch('/api/users/:id', updateUserById);

// Route handler to delete a user by ID - DELETE USER BY ID
router.delete('/api/users/:id', deleteUserById);

// export the router to be used
export default router;
