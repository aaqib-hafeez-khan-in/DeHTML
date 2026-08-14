import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import styles from './ToolLayout.module.css';

const StripperTool = ({ input, setInput, output, setOutput }) => {
  const { addToast } = useToast();
  const [isStripping, setIsStripping] = useState(false);

  const stripHtml = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  const handleStrip = () => {
    if (!input.trim()) {
      addToast('Please enter some HTML text to strip.', 'error');
      return;
    }

    setIsStripping(true);

    setTimeout(() => {
      const stripped = stripHtml(input);
      setOutput(stripped);
      setIsStripping(false);
      addToast('HTML tags stripped successfully!', 'success');
    }, 300);
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
      addToast('Failed to copy text. Please try again.', 'error');
    }
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    addToast('Text areas cleared!', 'success');
  };

  return (
    <div className={styles.container}>
      <div className={styles.editorGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Input HTML:</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your HTML here..."
            className={styles.textarea}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Plain Text Output:</label>
          <textarea 
            value={output}
            readOnly
            placeholder="Stripped text will appear here..."
            className={styles.textarea}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          onClick={handleStrip} 
          disabled={isStripping}
          className={styles.btnPrimary}
        >
          {isStripping ? 'Stripping...' : 'Strip HTML Tags'}
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

export default StripperTool;

