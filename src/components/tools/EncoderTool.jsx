import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import styles from './ToolLayout.module.css';

const EncoderTool = () => {
  const { addToast } = useToast();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const handleProcess = () => {
    if (!input.trim()) {
      addToast('Please enter some text to process.', 'error');
      return;
    }

    try {
      if (mode === 'encode') {
        const div = document.createElement('div');
        div.innerText = input;
        setOutput(div.innerHTML);
        addToast('Text encoded successfully!', 'success');
      } else {
        const div = document.createElement('div');
        div.innerHTML = input;
        setOutput(div.textContent || div.innerText || '');
        addToast('Text decoded successfully!', 'success');
      }
    } catch (e) {
      console.error(e);
      addToast('Error processing text.', 'error');
    }
  };

  const handleCopy = async () => {
    if (!output.trim()) {
      addToast('No text to copy!', 'error');
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      addToast('Text copied to clipboard!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to copy text.', 'error');
    }
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    addToast('Text areas cleared!', 'success');
  };

  return (
    <div className={styles.container}>
      <div className={styles.actions} style={{ marginBottom: '0.5rem' }}>
        <button 
          onClick={() => setMode('encode')}
          className={mode === 'encode' ? styles.btnPrimary : styles.btnSecondary}
        >
          Encode HTML Entities
        </button>
        <button 
          onClick={() => setMode('decode')}
          className={mode === 'decode' ? styles.btnPrimary : styles.btnSecondary}
        >
          Decode HTML Entities
        </button>
      </div>

      <div className={styles.editorGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Input Text:</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your text to ${mode} here...`}
            className={styles.textarea}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Output Text:</label>
          <textarea 
            value={output}
            readOnly
            className={styles.textarea}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          onClick={handleProcess} 
          className={styles.btnPrimary}
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        <button 
          onClick={handleCopy}
          className={styles.btnSecondary}
        >
          Copy
        </button>
        <button 
          onClick={handleReset}
          className={styles.btnOutline}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default EncoderTool;
