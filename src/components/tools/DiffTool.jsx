import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import styles from './ToolLayout.module.css';

const DiffTool = () => {
  const { addToast } = useToast();
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResult, setDiffResult] = useState(null);

  const computeDiff = () => {
    if (!text1.trim() && !text2.trim()) {
      addToast('Please enter text in both fields to compare.', 'warning');
      return;
    }

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    
    const result = [];
    for (let i = 0; i < maxLines; i++) {
        const l1 = lines1[i] || '';
        const l2 = lines2[i] || '';
        if (l1 === l2) {
            result.push({ type: 'equal', text: l1 });
        } else {
            if (i < lines1.length) result.push({ type: 'removed', text: l1 });
            if (i < lines2.length) result.push({ type: 'added', text: l2 });
        }
    }
    setDiffResult(result);
    addToast('Diff calculated.', 'success');
  };

  return (
    <div className={styles.container}>
      <div className={styles.editorGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Original Text:</label>
          <textarea 
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Paste original text here..."
            className={styles.textarea}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Modified Text:</label>
          <textarea 
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Paste modified text here..."
            className={styles.textarea}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          onClick={computeDiff} 
          className={styles.btnPrimary}
        >
          Compare Texts
        </button>
        <button 
          onClick={() => { setText1(''); setText2(''); setDiffResult(null); }}
          className={styles.btnOutline}
        >
          Clear
        </button>
      </div>

      {diffResult && (
        <div className={styles.resultArea}>
          <h3 className={styles.label} style={{ marginBottom: '1rem' }}>Difference Output:</h3>
          {diffResult.map((line, idx) => (
            <div 
              key={idx} 
              className={`${styles.diffLine} ${
                line.type === 'added' ? styles.diffAdded : 
                line.type === 'removed' ? styles.diffRemoved : styles.diffEqual
              }`}
            >
              {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}
              {line.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiffTool;

