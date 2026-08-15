import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import StripperTool from './StripperTool'
import { ToastProvider } from '../../context/ToastContext'
import React, { useState } from 'react'

const TestWrapper = ({ initialInput = '<p>Hello <b>World</b></p>' }) => {
  const [input, setInput] = useState(initialInput)
  const [output, setOutput] = useState('')
  return <ToastProvider><StripperTool input={input} setInput={setInput} output={output} setOutput={setOutput} /><div data-testid="output-value">{output}</div></ToastProvider>
}

describe('StripperTool', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
  })

  afterEach(() => vi.useRealTimers())

  it('strips html asynchronously', async () => {
    render(<TestWrapper />)
    fireEvent.click(screen.getByRole('button', { name: 'Strip HTML Tags' }))
    expect(screen.getByRole('button', { name: 'Stripping...' })).toBeDisabled()
    await act(async () => vi.advanceTimersByTime(300))
    await waitFor(() => expect(screen.getByTestId('output-value')).toHaveTextContent('Hello World'))
  })

  it('rejects empty input', () => {
    render(<TestWrapper initialInput="   " />)
    fireEvent.click(screen.getByRole('button', { name: 'Strip HTML Tags' }))
    expect(screen.getByText('Please enter some HTML text to strip.')).toBeInTheDocument()
  })

  it('copies output and handles empty output', async () => {
    render(<TestWrapper />)
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }))
    expect(screen.getByText('No text to copy!')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Strip HTML Tags' }))
    await act(async () => vi.advanceTimersByTime(300))
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello World')
  })

  it('reports clipboard failure', async () => {
    navigator.clipboard.writeText.mockRejectedValueOnce(new Error('denied'))
    render(<TestWrapper initialInput="<p>Hello</p>" />)
    fireEvent.click(screen.getByRole('button', { name: 'Strip HTML Tags' }))
    await act(async () => vi.advanceTimersByTime(300))
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }))
    await waitFor(() => expect(screen.getByText('Failed to copy text. Please try again.')).toBeInTheDocument())
  })

  it('resets both fields', async () => {
    render(<TestWrapper />)
    fireEvent.click(screen.getByRole('button', { name: 'Strip HTML Tags' }))
    await act(async () => vi.advanceTimersByTime(300))
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByLabelText('Input HTML:')).toHaveValue('')
    expect(screen.getByLabelText('Plain Text Output:')).toHaveValue('')
  })
})
