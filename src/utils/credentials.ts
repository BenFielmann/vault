import { Credential } from '../types';
import { decryptCredential, encryptCredential } from './crypto';
import { getCredentialCollection } from './database';

export async function readCredentials(): Promise<Credential[]> {
  const collection = getCredentialCollection();
  const credentials = await collection.find().toArray();
  return credentials;
}

export const findCredential = async (
  service: string,
  key: string
): Promise<Credential> => {
  const collection = getCredentialCollection();
  const credential = await collection.findOne({ service });

  if (!credential) {
    throw new Error(`No credential found for service: ${service}`);
  }

  return decryptCredential(credential, key);
};

export async function addCredential(
  credential: Credential,
  key: string
): Promise<void> {
  getCredentialCollection()
    .insertOne(encryptCredential(credential, key))
    .then((result) =>
      console.log(`Successfully inserted item with _id: ${result.insertedId}`)
    )
    .catch((err) => console.error(`Failed to insert item: ${err}`));
}

export const deleteCredential = async (service: string): Promise<void> => {
  const collection = getCredentialCollection();
  collection.findOneAndDelete({ service });
};

export const updateCredential = async (
  service: string,
  key: string,
  newCredential: Credential
): Promise<void> => {
  const encrptedCredential = encryptCredential(newCredential, key);
  const collection = getCredentialCollection();
  collection.findOneAndReplace({ service }, encrptedCredential);
};
