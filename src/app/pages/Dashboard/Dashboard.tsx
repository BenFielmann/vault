import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import logo from './logo.svg';

export default function Dashboard(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>Password Vault</h1>
      <img src={logo} className={styles['App-logo']} alt="logo" />
      <input className={styles.inputField} placeholder="Password" />
      <Link to="/vault">Vault</Link>
    </div>
  );
}
