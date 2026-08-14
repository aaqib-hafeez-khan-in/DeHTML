import React from 'react';
import styles from './TabBar.module.css';

const TabBar = ({ tabs, active, onChange }) => {
  return (
    <div className={styles.tabBar}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`${styles.tabButton} ${active === tab.id ? styles.tabActive : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
