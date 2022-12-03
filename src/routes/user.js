import { Router } from 'express';

// import the user Controller
import {
  SignUpUser,
  LoginUser,
  LogoutUser,
  LogoutUserAll,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from '../controllers/user.js';

// define a new router
const router = new Router();

// Route to create a new User - SIGN UP USER
router.post('/users', SignUpUser);

// Route that allows users to login - LOG IN USER
// login request generates and stores an authentication token and send it back to client
router.post('/users/login', LoginUser);

// Route that allows user to log out - LOG OUT
router.post('/users/logout', LogoutUser);

// Route handler to allow user to log out of all sessions - LOG OUT ALL
router.post('/users/logoutAll', LogoutUserAll);

// Route handler that allows user to get profile when they are authenicated
router.get('/users/me', getUserProfile);

// Route handler to updata an individual user by ID
router.patch('/users/me', updateUserProfile);

// Route handler to allow logged in user to delete thier own user profile - REMOVE ACCOUNT
router.delete('/users/me', deleteUser);

// export the router to be used
export default router;
