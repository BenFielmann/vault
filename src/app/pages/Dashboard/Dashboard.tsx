import React from 'react';
import styles from './Dashboard.module.css';
import logo from './logo.svg';

export default function Dashboard(): JSX.Element {
  return (
    <div className={styles.container}>
      <img src={logo} className={styles['App-logo']} alt="logo" />
      <h1 className={styles.headline}>Password Vault</h1>
      <input className={styles.inputField} placeholder="Password" />
    </div>
  );
}
