import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>DeHTML Suite</h1>
      <p className={styles.subtitle}>Advanced Web Developer Utilities</p>
    </header>
  );
};

export default Header;
