import { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch('http://localhost:3000/tasks');
    const data = await res.json();
    setTasks(data);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      await fetch(`http://localhost:3000/tasks/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setEditId(null);
    } else {
      await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ title: '', description: '', status: '' });
    fetchTasks();
  }

  async function handleDelete(id) {
    await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  }

  function handleEdit(task) {
    setEditId(task.id);
    setForm({ title: task.title, description: task.description, status: task.status });
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Gerenciador de Tarefas</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        >
          <option value="">Selecione o status</option>
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em andamento</option>
          <option value="concluída">Concluída</option>
        </select>
        <button type="submit" style={{ padding: '8px 16px' }}>
          {editId ? 'Salvar Alterações' : 'Criar Tarefa'}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ title: '', description: '', status: '' });
            }}
            style={{ marginLeft: 10, padding: '8px 16px' }}
          >
            Cancelar
          </button>
        )}
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              background: '#f4f4f4',
              marginBottom: 10,
              padding: 10,
              borderRadius: 4,
            }}
          >
            <strong>{task.title}</strong> - <em>{task.status}</em>
            <p>{task.description}</p>
            <button onClick={() => handleEdit(task)} style={{ marginRight: 10 }}>
              Editar
            </button>
            <button onClick={() => handleDelete(task.id)} style={{ color: 'red' }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
