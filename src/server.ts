import { readCredentials } from './utils/credentials';

(async () => {
  console.log(await readCredentials());
})();
