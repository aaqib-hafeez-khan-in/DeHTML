import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <a href="./legacy/index.html" target="_blank" rel="noreferrer">
             <span className={styles.legacyBadge}>Legacy Version</span>
          </a>
          <a href="https://github.com/AaqibhafeezKhan/DeHTML" target="_blank" rel="noreferrer">GitHub Repo</a>
        </div>
        <p className={styles.copyright}>
          DeHTML Suite &copy; {new Date().getFullYear()} — Built for modern workflows with React + Vite
        </p>
      </div>
    </footer>
  );
};

export default Footer;
