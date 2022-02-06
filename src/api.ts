import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";
import { join } from "path";
import Users from "./models/users.model";

config({ path: join(__dirname, "../.env") });

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.disable("x-powered-by");
const users = new Users();

app.get("/", (req, res) => res.json({ message: "Virtual Wallet" }));

app.post("/users", async (req, res) => {
  const { name, email, cpf, tel } = req.body;
  try {
    const resp = await users.createUser(name, email, cpf, tel);
    return res.status(201).send(resp);
  } catch (err: any) {
    res.status(500).json({ message: "Deu ruim" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const resp = await users.allUsers();
    return res.status(200).send(resp);
  } catch (error) {
    res.status(500).json({ message: "Deu ruim" });
  }
});

app.listen(PORT, () => console.log(`Running on <http://localhost:${PORT}>`));
