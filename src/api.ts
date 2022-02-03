import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, "../.env") });

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.disable("x-powered-by");

app.get("/", (req, res) => res.json({ message: "Virtual Wallet" }));

app.listen(PORT, () => console.log(`Running on <http://localhost:${PORT}>`));
