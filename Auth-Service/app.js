import express from 'express';
import authRoutes from './routes/authRoutes.js';  
import ConsulConfiguration from "./consul-config.js";
import { setupKafkaConsumer, login } from './controllers/authController.js';
import cors from 'cors';

const app = express();
ConsulConfiguration(app);
app.use(cors());

setupKafkaConsumer();
app.use(express.json());


app.use('/auth', authRoutes);

app.listen(process.env.HOST_PORT, () => {
  console.log(`Server running on port ${process.env.HOST_PORT}`);
});
