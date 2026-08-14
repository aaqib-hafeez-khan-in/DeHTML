import { useState } from 'react'
import { useToast } from '../../context/ToastContext'
import styles from './ToolLayout.module.css'

export default function MinifierTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [type, setType] = useState('html')
  const { addToast } = useToast()

  const handleMinify = () => {
    if (!input.trim()) {
      addToast('Please enter some code to minify', 'error')
      return
    }
    
    let result = input;
    if (type === 'html') {
      result = result
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();
    } else if (type === 'css') {
      result = result
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .trim();
    } else if (type === 'js') {
      result = result
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([=+\-*/<>{}()[\],;:&|!])\s*/g, '$1')
        .trim();
    }

    setOutput(result)
    const originalSize = new Blob([input]).size
    const newSize = new Blob([result]).size
    const saved = originalSize === 0 ? 0 : ((originalSize - newSize) / originalSize * 100).toFixed(1)
    
    addToast(`Minified successfully! Saved ${saved}%`, 'success')
  }

  const handleCopy = async () => {
    if (!output) {
      addToast('Nothing to copy!', 'error')
      return
    }
    try {
      await navigator.clipboard.writeText(output)
      addToast('Copied to clipboard!', 'success')
    } catch {
      addToast('Failed to copy', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.actions} style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {['html', 'css', 'js'].map(t => (
            <button 
              key={t}
              onClick={() => setType(t)}
              className={type === t ? styles.btnPrimary : styles.btnSecondary}
              style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleClear} className={styles.btnOutline}>Clear</button>
          <button onClick={handleMinify} className={styles.btnPrimary}>Minify Code</button>
          <button onClick={handleCopy} className={styles.btnSecondary}>Copy Output</button>
        </div>
      </div>
      
      <div className={styles.editorGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Original {type.toUpperCase()} Code</label>
          <textarea
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your ${type.toUpperCase()} here...`}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Minified Result</label>
          <textarea
            className={styles.textarea}
            value={output}
            readOnly
            placeholder="Minified output will appear here..."
          />
        </div>
      </div>
    </div>
  )
}

