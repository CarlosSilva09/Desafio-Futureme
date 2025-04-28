const request = require('supertest');
const fs = require('fs');
const path = require('path');
const appPath = path.join(__dirname, '..', 'index.js');

let server;

beforeAll(() => {
  server = require(appPath);
});

afterAll(done => {
  server.close(done);
});

describe('API de Tarefas', () => {
  let createdTaskId;

  test('GET /tasks deve retornar array', async () => {
    const res = await request(server).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /tasks deve criar tarefa', async () => {
    const res = await request(server)
      .post('/tasks')
      .send({ title: 'Teste', description: 'Descrição', status: 'pendente' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdTaskId = res.body.id;
  });

  test('PUT /tasks/:id deve atualizar tarefa', async () => {
    const res = await request(server)
      .put('/tasks/' + createdTaskId)
      .send({ title: 'Teste Atualizado', description: 'Descrição Atualizada', status: 'concluída' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Teste Atualizado');
  });

  test('DELETE /tasks/:id deve deletar tarefa', async () => {
    const res = await request(server).delete('/tasks/' + createdTaskId);
    expect(res.statusCode).toBe(204);
  });
});
