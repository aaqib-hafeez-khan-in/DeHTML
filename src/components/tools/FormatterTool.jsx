import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import styles from './ToolLayout.module.css';

const FormatterTool = () => {
  const { addToast } = useToast();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatHtml = (html) => {
    let formatted = '';
    let indent = '';
    const tab = '  ';
    
    html.split(/>\s*</).forEach(function(element) {
      if (element.match(/^\/\w/)) {
        indent = indent.substring(tab.length);
      }
      
      formatted += indent + '<' + element + '>\r\n';
      
      if (element.match(/^<?\w[^>]*[^/]$/) && !element.startsWith("input") && !element.startsWith("img") && !element.startsWith("br") && !element.startsWith("hr")) { 
        indent += tab;              
      }
    });
    
    return formatted.substring(1, formatted.length - 3);
  };

  const handleFormat = () => {
    if (!input.trim()) {
      addToast('Please enter some HTML to format.', 'error');
      return;
    }
    
    try {
      setOutput(formatHtml(input));
      addToast('HTML formatted successfully!', 'success');
    } catch (e) {
      console.error(e);
      addToast('Error formatting HTML.', 'error');
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
      <div className={styles.editorGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Input HTML:</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your unformatted HTML here..."
            className={styles.textarea}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Formatted HTML:</label>
          <textarea 
            value={output}
            readOnly
            placeholder="Formatted output will appear here..."
            className={styles.textarea}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          onClick={handleFormat} 
          className={styles.btnPrimary}
        >
          Format HTML
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

export default FormatterTool;

