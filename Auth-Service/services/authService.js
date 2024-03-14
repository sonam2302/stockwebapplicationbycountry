import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as authRepository from '../repositories/authRepository.js';
import "dotenv/config";

const generateToken = (payload) => {
  console.log(payload,'payload')
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const createUserCredentials = async (userData) => {
  console.log('Received data for user creation:', userData);
  try {
    return await authRepository.createUserCredentials(userData);
  } catch (error) {
    console.error(`Error creating user credentials: ${error.message}`);
    throw error;
  }
};

const verifyToken = (token) => {
  console.log(token,'tokenverify')
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error(`Error verifying token: ${error.message}`);
    return null;
  }
};
const authenticateUser = async (username, password) => {
  console.log(username, password, 'passwordusername');
  try {
    console.log(`Authenticating user: ${username}`);
    const userCredentials = await authRepository.getUserCredentials(username);
    console.log(userCredentials, 'userCredentials');

    if (!userCredentials) {
      console.log(`User ${username} not found`);
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compareSync(password, userCredentials.password);

    if (!isPasswordValid) {
      console.log(`Invalid credentials for user: ${username}`);
      throw new Error('Invalid credentials');
    }

    const token = generateToken({ username: userCredentials.username });
    console.log(`Authentication successful for user: ${username}`, token, 'yay');

    // Verify the generated token
    const verifiedToken = verifyToken(token);

    if (!verifiedToken) {
      console.error('Token verification failed');
      throw new Error('Token verification failed');
    }

    return { token }; 
  } catch (error) {
    console.error(`Error authenticating user: ${error.message}`);
    throw new Error(`Error authenticating user: ${error.message}`);
  }
};


const getUserCredentials = async (username) => {
  try {
    console.log(`Retrieving user credentials for username: ${username}`);
    const userCredentials = await authRepository.getUserCredentials(username);

    if (userCredentials) {
      console.log('User credentials found:', userCredentials);
      return userCredentials;
    } else {
      console.log(`User credentials not found for username: ${username}`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving user credentials: ${error.message}`);
    throw new Error(`Error retrieving user credentials: ${error.message}`);
  }
};

export {
  createUserCredentials,
  authenticateUser,
  getUserCredentials
};



