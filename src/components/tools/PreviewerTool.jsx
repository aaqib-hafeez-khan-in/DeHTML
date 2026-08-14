import { useState } from 'react'
import styles from './ToolLayout.module.css'

export default function PreviewerTool() {
  const [code, setCode] = useState('<h1>Hello Previewer!</h1>\n<style>\n  h1 { color: #ec4899; }\n</style>')

  return (
    <div className={styles.container}>
      <div className={styles.editorGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>HTML / CSS / JS Code</label>
          <textarea
            className={styles.textarea}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste HTML here, script tags and style tags will execute..."
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Live Preview</label>
          <iframe
            style={{ 
              flex: 1, 
              width: '100%', 
              height: '300px', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: 'var(--radius-md)',
              background: 'white'
            }}
            srcDoc={code}
            title="Preview"
            sandbox="allow-scripts"
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          onClick={() => setCode('')} 
          className={styles.btnOutline}
        >
          Clear Editor
        </button>
        <button 
          onClick={() => setCode('<h1>Hello Previewer!</h1>\n<style>\n  h1 { color: #ec4899; }\n</style>')} 
          className={styles.btnSecondary}
        >
          Reset Demo
        </button>
      </div>
    </div>
  )
}

