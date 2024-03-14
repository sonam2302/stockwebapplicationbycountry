import User from "../models/userModel.js";

const createUser = async (userData) => {
  console.log(userData, "userData");
  return await User.create(userData);
};

const getUserByUsername = async (username) => {
  return await User.findOne({
    where: { username },
  });
};

const getUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
  });
};

const getUserByMobile = async (mobile) => {
  return await User.findOne({
    where: { mobile },
  });
};

export { createUser, getUserByUsername, getUserByEmail, getUserByMobile };
