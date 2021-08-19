import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Credential } from '../../../types';
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
      <h1 className={styles.headline}>Password Vault</h1>
      <img src={logo} className={styles['App-logo']} alt="logo" />
      <Link to="/vault">Vault</Link>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchCredentials();
        }}
      >
        <input
          type="password"
          value={masterPassword}
          onChange={(event) => setMasterPassword(event.target.value)}
          className={styles.inputField}
          placeholder="Du Weischttttt"
        />
        <button type="submit">Submit</button>
      </form>
      {credentials.length !== 0 &&
        credentials.map((credential) => (
          <div>
            <p>{credential.service}</p>
            <p>{credential.username}</p>
            <p>{credential.password}</p>
          </div>
        ))}
    </main>
  );
}
