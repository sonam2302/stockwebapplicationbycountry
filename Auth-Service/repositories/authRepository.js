import Auth from '../models/authModel.js';

const getUserCredentials = async (username) => {
  try {
    console.log(username, 'username repo');
    
    const user = await Auth.findOne({
      where: { username },
    });

    if (user) {
      console.log('User found:', user);
      return user;
    } else {
      console.log('User not found.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user credentials:', error);
    throw error;
  }
};

const createUserCredentials = async ({ username, password }) => {
  console.log(username, 'userData in repository', password);
  try {
    return await Auth.create({ username, password });
  } catch (error) {
    console.error('Error creating user credentials:', error);
    throw new Error(`Error creating user credentials: ${error.message}`);
  }
};

export {
  getUserCredentials,
  createUserCredentials,
};
