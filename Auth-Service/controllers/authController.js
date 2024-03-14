import * as authService from '../services/authService.js';
import kafka from "kafka-node";
import * as authRepository from '../repositories/authRepository.js';

const processKafkaMessage = async (message) => {
  try {
    console.log(message, 'message');

    // Extracting username and password from the Kafka message
    const { username, password } = JSON.parse(message.value);
    console.log('Extracted data from Kafka message:', username, password);

    // Checking if the user already exists in the database
    const existingUser = await authRepository.getUserCredentials(username);
    console.log(existingUser, 'existingUserexistingUser');

    if (existingUser) {
      console.log('User already exists. You may want to handle this case.');
    } else {
      console.log("else statement is executed");
      // Creating a new user in the database
      await authRepository.createUserCredentials({ username, password });
      console.log('User created successfully.');
    }

    // Authenticating user based on the received credentials
    const result = await authService.authenticateUser(username, password);
    console.log(result, 'result');
  } catch (error) {
    console.error('Error processing Kafka message:', error);
  }
};

const setupKafkaConsumer = () => {
  console.log('is it getting called')
  const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
  const consumer = new kafka.Consumer(client, [{ topic: 'usertopic' }]);

  consumer.on('message', processKafkaMessage);

  consumer.on('error', (err) => {
    console.log('Consumer error', err);
  });
};

const login = async (req, res) => {
  try {
    // Extracting username and password from the HTTP request body
    const { username, password } = req.body;

    // Authenticate user based on the received credentials
    const result = await authService.authenticateUser(username, password);
    console.log('result',result, 'result');
    // Include the username in the result
    const resultWithUsername = { ...result, username };

    // Sending the result to the frontend
    res.status(200).send(resultWithUsername);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};

export { setupKafkaConsumer, login };

