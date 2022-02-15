import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";
import { join } from "path";
import {
  allUsers,
  createUser,
  editUser,
  login,
  viewUser,
} from "./controllers/users.controlers";
import { tokenVerify } from "./middlewares/jwtVerify.middle";

config({ path: join(__dirname, "../.env") });

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

// ROUTES
app.get("/", (req, res) => res.json({ message: "Virtual Wallet" }));
app.post("/users", createUser);
app.patch("/users/:id", tokenVerify, editUser);
app.post("/login", login);
app.get("/users/:id", tokenVerify, viewUser);
app.get("/users", tokenVerify, allUsers);

app.listen(PORT, () => console.log(`Running on <http://localhost:${PORT}>`));
