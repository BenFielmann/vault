import type { ObjectId } from 'mongodb';
import { Credential } from '../types';
import { decryptCredential, encryptCredential } from './crypto';
import { getCredentialCollection } from './database';

export async function readCredentials(key: string): Promise<Credential[]> {
  const collection = getCredentialCollection();
  const credentials = await collection.find().toArray();
  const decryptedCredentials = credentials.map((credential) =>
    decryptCredential(credential, key)
  );
  return decryptedCredentials;
}

export const findCredential = async (
  service: string,
  key: string
): Promise<Credential> => {
  const credentialCollection = getCredentialCollection();
  const encryptedCredential = await credentialCollection.findOne({ service });

  if (!encryptedCredential) {
    throw new Error(`Unable to find service ${service}`);
  }

  const credential = decryptCredential(encryptedCredential, key);
  return credential;
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

export async function updateCredential(
  service: string,
  credential: Credential,
  key: string
): Promise<void> {
  const credentialCollection = getCredentialCollection();

  const encryptedCredential = encryptCredential(credential, key);

  await credentialCollection.updateOne(
    { service },
    { $set: encryptedCredential }
  );
}
