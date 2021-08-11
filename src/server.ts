import express from 'express';
import {
  addCredential,
  deleteCredential,
  findCredential,
  readCredentials,
} from './utils/credentials';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/credentials', async (request, response) => {
  const credential = request.body;
  await addCredential(credential);
  response.status(200).send(credential);
});

app.get('/api/credentials', async (_request, response) => {
  try {
    const credentials = await readCredentials();
    response.status(200).send(credentials);
  } catch (error) {
    console.error(error);
    response.status(500).send(`Internal server error`);
  }
});

app.get('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  try {
    const credential = await findCredential(service);
    response.status(200).json(credential);
  } catch (error) {
    console.error(error);
    response.status(404).send(`Could not find service:`);
  }
});

app.delete('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  await deleteCredential(service);
  response.status(200).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
