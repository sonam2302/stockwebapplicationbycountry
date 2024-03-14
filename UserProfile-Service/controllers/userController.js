import * as userProfileService from "../services/userProfileService.js";
import kafka from "kafka-node";

let client;
let producer;

const registerUser = async (req, res) => {
  try {
        const user = await userProfileService.registerUser(req.body);
     // Code for saving data to database
  client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
  producer = new kafka.Producer(client);
  producer.on("ready", () => {
    console.log("Producer is ready");
    const payloads = [{ topic: "usertopic", messages: JSON.stringify({ username: user.username, password: user.password })}];

    producer.send(payloads, (err, data) => {
      console.log(payloads,'payloads')
      if (err) {
        console.log(err);
      } else {
        console.log("Message Sent");
      }
    });
  });

  producer.on("error", (err) => {
    console.log("Producer error", err);
  });

    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { registerUser };
