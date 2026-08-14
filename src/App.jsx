import { useState } from 'react'
import Header from './components/Header'
import TabBar from './components/TabBar'
import StripperTool from './components/tools/StripperTool'
import EncoderTool from './components/tools/EncoderTool'
import DiffTool from './components/tools/DiffTool'
import FormatterTool from './components/tools/FormatterTool'
import MinifierTool from './components/tools/MinifierTool'
import PreviewerTool from './components/tools/PreviewerTool'
import StatsPanel from './components/StatsPanel'
import ToastContainer from './components/ToastContainer'
import Footer from './components/Footer'
import { ToastProvider } from './context/ToastContext'
import styles from './App.module.css'

const TABS = [
  { id: 'strip',   label: 'Strip Tags' },
  { id: 'encode',  label: 'Encode / Decode' },
  { id: 'diff',    label: 'Diff Viewer' },
  { id: 'format',  label: 'Formatter' },
  { id: 'minify',  label: 'Minifier' },
  { id: 'preview', label: 'Previewer' }
]

export default function App() {
  const [activeTab, setActiveTab] = useState('strip')
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')

  const renderTool = () => {
    switch (activeTab) {
      case 'strip':  return <StripperTool input={inputText} setInput={setInputText} output={outputText} setOutput={setOutputText} />
      case 'encode': return <EncoderTool />
      case 'diff':   return <DiffTool />
      case 'format': return <FormatterTool />
      case 'minify': return <MinifierTool />
      case 'preview':return <PreviewerTool />
      default:       return null
    }
  }

  return (
    <ToastProvider>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <TabBar tabs={TABS} active={activeTab} onChange={(id) => { setActiveTab(id); setInputText(''); setOutputText('') }} />
          <div className={styles.toolArea}>
            {renderTool()}
          </div>
          {activeTab === 'strip' && <StatsPanel text={outputText} />}
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </ToastProvider>
  )
}
