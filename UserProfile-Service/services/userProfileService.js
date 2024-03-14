import bcrypt from "bcryptjs";
import * as userRepository from "../repositories/userRepository.js";

const registerUser = async (userData) => {
  const { firstName, lastName, username, email, password, city, age, mobile } =
    userData;

  // Checking if email and mobile are unique
  const existingEmail = await userRepository.getUserByEmail(email);
  const existingMobile = await userRepository.getUserByMobile(mobile);

  if (existingEmail) {
    throw new Error("Email is already in use");
  }

  if (existingMobile) {
    throw new Error("Mobile number is already in use");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hashSync(password);

  // Saving user details to the database
  const user = await userRepository.createUser({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    city,
    age,
    mobile,
  });


  return user;
};

export { registerUser };


