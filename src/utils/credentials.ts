import { readFile, writeFile } from 'fs/promises';
import { DB, Credential } from '../types';
import { decryptCredential, encryptCredential } from './crypto';

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const credentials: Credential[] = db.credentials;
  return credentials;
}

export const findCredential = async (
  service: string,
  key: string
): Promise<Credential> => {
  const credentials = await readCredentials();
  const credential = credentials.find(
    (credential) => credential.service.toLowerCase() === service.toLowerCase()
  );

  if (!credential) {
    throw new Error(`No credential found for service: ${service}`);
  }
  const decryptedCredential = decryptCredential(credential, key);
  return decryptedCredential;
};

export async function addCredential(
  credential: Credential,
  key: string
): Promise<void> {
  const credentials = await readCredentials();
  const encryptedCredential = encryptCredential(credential, key);
  const newCredentials = [...credentials, encryptedCredential];
  const db: DB = {
    credentials: newCredentials,
  };
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
  key: string,
  newCredential: Credential
): Promise<void> => {
  const credentials: Credential[] = await readCredentials();
  const filteredCredentials = credentials.filter(
    (credential) => credential.service !== service
  );
  const encryptedCredential = encryptCredential(newCredential, key);
  const newCredentials = [...filteredCredentials, encryptedCredential];

  const db = {
    credentials: newCredentials,
  };
  return await overWriteDB(db);
};

async function overWriteDB(db: DB): Promise<void> {
  const dbString = JSON.stringify(db, null, 2);
  await writeFile('src/db.json', dbString);
}
