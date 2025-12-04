const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const itemsRouter = require("./routes/items");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/items", itemsRouter);

app.get("/", (req, res) => res.send("API funcionando!"));

app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
