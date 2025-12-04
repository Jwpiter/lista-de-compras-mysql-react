const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM items ORDER BY id DESC");
  res.json(rows);
});

router.post("/", async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ error: "Nome obrigatório" });

    const [result] = await db.query(
      "INSERT INTO items (nome, comprado) VALUES (?, 0)",
      [nome]
    );

    const [rows] = await db.query("SELECT * FROM items WHERE id = ?", [
      result.insertId,
    ]);

    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Erro ao inserir item:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

router.put("/:id", async (req, res) => {
  const { nome, comprado } = req.body;
  await db.query("UPDATE items SET nome=?, comprado=? WHERE id=?", [
    nome,
    comprado ? 1 : 0,
    req.params.id,
  ]);
  const [item] = await db.query("SELECT * FROM items WHERE id=?", [
    req.params.id,
  ]);
  res.json(item[0]);
});

router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM items WHERE id=?", [req.params.id]);
  res.sendStatus(204);
});

module.exports = router;
