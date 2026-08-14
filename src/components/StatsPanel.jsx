import React from 'react';
import styles from './StatsPanel.module.css';

const StatsPanel = ({ text }) => {
  if (!text) return null;

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text.trim() ? text.split(/\r\n|\r|\n/).length : 0;

  return (
    <div className={styles.statsPanel}>
      <div className={styles.statItem}>
        <div className={styles.statValue}>{charCount}</div>
        <div className={styles.statLabel}>Characters</div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.statItem}>
        <div className={styles.statValue}>{wordCount}</div>
        <div className={styles.statLabel}>Words</div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.statItem}>
        <div className={styles.statValue}>{lineCount}</div>
        <div className={styles.statLabel}>Lines</div>
      </div>
    </div>
  );
};

export default StatsPanel;
