import CryptoJS from 'crypto-js';
import { Credential } from '../types';

const masterKey = 'Zippo';

export const encryptCredential = (credential: Credential): Credential => {
  const encryptedPassword = CryptoJS.TripleDES.encrypt(
    credential.password,
    masterKey
  ).toString();

  const encryptedCredential = {
    ...credential,
    password: encryptedPassword,
  };

  return encryptedCredential;
};

export const decryptCredential = (credential: Credential): Credential => {
  const decryptedPassword = CryptoJS.TripleDES.decrypt(
    credential.password,
    masterKey
  ).toString(CryptoJS.enc.Utf8);

  const decryptedCredential = {
    ...credential,
    password: decryptedPassword,
  };

  return decryptedCredential;
};
