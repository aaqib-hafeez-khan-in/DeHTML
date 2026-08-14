import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StripperTool from './StripperTool'
import { ToastProvider } from '../../context/ToastContext'
import React, { useState } from 'react'

const TestWrapper = () => {
  const [input, setInput] = useState('<p>Hello <b>World</b></p>')
  const [output, setOutput] = useState('')

  return (
    <ToastProvider>
      <StripperTool 
        input={input} 
        setInput={setInput} 
        output={output} 
        setOutput={setOutput} 
      />
      <div data-testid="output-value">{output}</div>
    </ToastProvider>
  )
}

describe('StripperTool Components', () => {
  it('strips html correctly on button click', async () => {
    render(<TestWrapper />)
    
    expect(screen.getByText('Strip HTML Tags')).toBeInTheDocument()
    
    const stripButton = screen.getByText('Strip HTML Tags')
    fireEvent.click(stripButton)
    
    await waitFor(() => {
      const outputVal = screen.getByTestId('output-value').textContent
      expect(outputVal).toBe('Hello World')
    }, { timeout: 1000 })
  })
})
