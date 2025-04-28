const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const app = express();
const PORT = 3000;

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { title, description, status } = req.body;
  const newTask = await prisma.task.create({
    data: { title, description, status },
  });
  res.status(201).json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, status } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, status },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.task.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`App1 rodando na porta ${PORT}`);
});
