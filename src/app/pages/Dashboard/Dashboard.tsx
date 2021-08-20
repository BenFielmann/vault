import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';
import styles from './Dashboard.module.css';
import logo from './logo.svg';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterPassword, setMasterPassword] = useState('');

  async function fetchCredentials() {
    const response = await fetch('/api/credentials', {
      headers: {
        Authorization: masterPassword,
      },
    });
    const credentials = await response.json();
    setCredentials(credentials);
  }

  useEffect(() => {
    fetchCredentials();
    if (!masterPassword) {
      setCredentials([]);
    }
  }, [masterPassword]);

  return (
    <main className={styles.container}>
      <h1 className={styles.headline}>Chaapa'ai Tel'tak</h1>
      <img src={logo} className={styles['App-logo']} alt="logo" />
      <Link to="/vault">Mak</Link>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchCredentials();
        }}
      >
        <input
          type="text"
          value={masterPassword}
          onChange={(event) => setMasterPassword(event.target.value)}
          className={styles.inputField}
          placeholder="dfaeghijk"
        />
        <button type="submit" className={styles.logInButton}>
          Submit
        </button>
      </form>
      {credentials.length !== 0 &&
        credentials.map((credential) => (
          <CredentialCard credentialData={credential} />
        ))}
      <Link to="/Add">Blah</Link>
    </main>
  );
}
