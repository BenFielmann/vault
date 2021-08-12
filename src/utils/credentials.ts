import { readFile, writeFile } from 'fs/promises';
import { DB, Credential } from '../types';
import { decryptCredential, encryptCredential } from './crypto';

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const credentials: Credential[] = db.credentials;
  const decryptedCredentials = credentials.map((credential) => {
    return decryptCredential(credential);
  });
  return decryptedCredentials;
}

export const findCredential = async (service: string): Promise<Credential> => {
  const credentials = await readCredentials();
  const credential = credentials.find(
    (credential) => credential.service.toLowerCase() === service.toLowerCase()
  );
  if (!credential) {
    throw new Error(`No credential found for service: ${service}`);
  }

  return credential;
};

export async function addCredential(credential: Credential): Promise<void> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const newCredential = encryptCredential(credential);
  db.credentials = [...db.credentials, newCredential];
  await overWriteDB(db);
}

export const deleteCredential = async (service: string): Promise<void> => {
  const credentials = await readCredentials();
  const filteredCredential = credentials.filter(
    (credential) => credential.service.toLowerCase() !== service.toLowerCase()
  );
  const db: DB = { credentials: filteredCredential };
  await overWriteDB(db);
};

export const updateCredential = async (
  service: string,
  newCredential: Credential
): Promise<void> => {
  const credentials: Credential[] = await readCredentials();
  const editedCredentials = credentials.map((credential) => {
    if (credential.service.toLowerCase() === service.toLowerCase()) {
      credential = newCredential;
    }
    return credential;
  });

  const db = {
    credentials: editedCredentials,
  };
  return await overWriteDB(db);
};

async function overWriteDB(db: DB): Promise<void> {
  const dbString = JSON.stringify(db, null, 2);
  await writeFile('src/db.json', dbString);
}
