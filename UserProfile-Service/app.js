import express from "express";
import userRoutes from "./routes/userRoutes.js";
import ConsulConfiguration from "./consul-config.js";
import cors from 'cors';
const app = express();
app.use(cors());
ConsulConfiguration(app);

app.use(express.json());

app.use("/user", userRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

app.listen(process.env.HOST_PORT, () => {
  console.log(`Server running on port ${process.env.HOST_PORT}`);
});
