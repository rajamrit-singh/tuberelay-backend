import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController';
import { checkRequiredParameters } from '../utils/usersUtils';
import { UserRegistrationData } from '../models/userTypes';

const usersRouter = express.Router();

usersRouter.post('/users/register', async (req, res) => {
  try {
    const userData: UserRegistrationData = checkRequiredParameters(req.body)
    const userId = await registerUser(userData);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error: any) {
    console.error('Error registering user:', error);
    res.status(error.status).json({ message: error.message }); 
  }
});

usersRouter.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginResult = await loginUser(email, password);
    res.json(loginResult);
  } catch (error: any) {
    console.error('Error logging in user:', error);
    res.status(error.status).json({ message: error.message }); 
  }
});

usersRouter.post('/users/logout', async (req, res) => {
  const token: string = req.headers.authorization?.split(' ')[1]!; 

  try {
    await logoutUser(token);
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error: any) {
    console.error('Error logging out user:', error);
    res.status(error.status).json({ message: error.message }); 
  }
});
export default usersRouter;
