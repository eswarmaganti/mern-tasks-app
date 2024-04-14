import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import db from "./db.js";
import path from "path";
import url from "url";
import taskRouter from "./routes/tasks.js";
import taskUpdatesRouter from "./routes/taskUpdates.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

dotenv.config();

const app = express();

// initializing the middlewares
app.use(morgan("tiny"));
app.use(express.json());

// connecting to mongoDB
db();

app.use(cors());
app.use(express.static(path.join(__dirname, "../../react-client/dist/")));
app.use("/api/v1/tasks/", taskRouter);
app.use("/api/v1/taskupdates/", taskUpdatesRouter);

// Running Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`*** Server is listening on PORT ${PORT} ***`);
});
