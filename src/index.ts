import express from "express";
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

const port = process.env.PORT || 4568;


app.use(express.json());
app.use('/', userRoutes); 




app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
