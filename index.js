import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./db/index.js";
import routes from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB Connection Failed`, err);
  });

// middlewares
app.use("/api", routes);

app.listen;
