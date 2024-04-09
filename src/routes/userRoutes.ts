import express from 'express';
import { registerUser } from '../controllers/userController';

const usersRouter = express.Router();

usersRouter.post('/users/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userId = await registerUser(email, password);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});


export default usersRouter;
