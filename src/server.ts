import express, { request, response } from 'express';
import { readCredentials } from './utils/credentials';

const app = express();
const port = 3000;

app.get('/api/credentials', async (_req, res) => {
  res.status(200).json(await readCredentials());
});

/*app.get('/api/credential/:service' async (request, response) => {

});*/

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
