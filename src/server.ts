import express, { request } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import {
  addCredential,
  deleteCredential,
  findCredential,
  readCredentials,
  updateCredential,
} from './utils/credentials';

import { validateMasterpassword } from './utils/validation';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/credentials', async (request, response) => {
  const credential = request.body;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterpassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }
  await addCredential(credential, masterPassword);
  response.status(200).send(credential);
});

app.get('/api/credentials', async (_request, response) => {
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterpassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }
  try {
    const credentials = await readCredentials(masterPassword);
    response.status(200).send(credentials);
  } catch (error) {
    console.error(error);
    response.status(500).send(`Internal server error`);
  }
});

app.get('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterpassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }
  try {
    const credential = await findCredential(service, masterPassword);
    response.status(200).json(credential);
  } catch (error) {
    console.error(error);
    response.status(404).send(`Could not find service: ${service}`);
  }
});

app.put('/api/credentials/:service', async (request, response) => {
  const urlParameter = request.params.service;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterpassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }
  await updateCredential(urlParameter, masterPassword, request.body);
  response.status(200).send();
});

app.delete('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterpassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }
  await deleteCredential(service, masterPassword);
  response.status(200).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
