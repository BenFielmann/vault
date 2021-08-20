import React from 'react';
import { Credential } from '../../../types';
import styles from './CredentialCard.module.css';

type CredentialCardProps = {
  credentialData: Credential;
};

export default function CredentialCard({
  credentialData,
}: CredentialCardProps): JSX.Element {
  return (
    <div className={styles.frame}>
      <p className={styles.data}>{credentialData.service}</p>
      <p className={styles.data}>{credentialData.username}</p>
      <p className={styles.data}>{credentialData.password}</p>
    </div>
  );
}
