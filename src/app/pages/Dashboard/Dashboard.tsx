import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import logo from './logo.svg';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);

  useEffect(() => {
    async function fetchCredentials() {
      const response = await fetch('/api/credentials', {
        headers: {
          Authorization: 'Zippo',
        },
      });
      const credentials = await response.json();
      setCredentials(credentials);
    }
    fetchCredentials();
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.headline}>Password Vault</h1>
      <img src={logo} className={styles['App-logo']} alt="logo" />
      <Link to="/vault">Vault</Link>
      <input className={styles.inputField} placeholder="Password" />
      {credentials &&
        credentials.forEach((Credential) => console.log(Credential))}
    </main>
  );
}
