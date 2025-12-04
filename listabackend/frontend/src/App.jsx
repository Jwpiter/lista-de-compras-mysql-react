import { useEffect, useState } from "react";
import { api } from "./api";

export default function App() {
  const [items, setItems] = useState([]);
  const [nome, setNome] = useState("");

  async function carregarItems() {
    const res = await api.get("/items");
    setItems(res.data);
  }

  async function adicionarItem(e) {
    e.preventDefault();
    if (!nome) return;

    const res = await api.post("/items", { nome });
    setItems([res.data, ...items]);
    setNome("");
  }

  async function marcarComprado(id, comprado) {
    const res = await api.put(`/items/${id}`, { comprado });
    setItems(items.map((i) => (i.id === id ? res.data : i)));
  }

  async function deletarItem(id) {
    await api.delete(`/items/${id}`);
    setItems(items.filter((i) => i.id !== id));
  }

  useEffect(() => {
    carregarItems();
  }, []);

  return (
    <div className="container">
      <h1>🛒 Lista de Compras</h1>

      <form onSubmit={adicionarItem} className="form">
        <input
          type="text"
          placeholder="Adicionar item..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button>Adicionar</button>
      </form>

      <ul>
        {items.map((i) => (
          <li key={i.id} className={i.comprado ? "checked" : ""}>
            <span onClick={() => marcarComprado(i.id, !i.comprado)}>
              {i.nome}
            </span>
            <button onClick={() => deletarItem(i.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
