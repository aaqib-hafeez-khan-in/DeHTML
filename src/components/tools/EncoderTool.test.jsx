import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EncoderTool from './EncoderTool'
import { ToastProvider } from '../../context/ToastContext'

const renderTool = () => render(<ToastProvider><EncoderTool /></ToastProvider>)

beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
})

describe('EncoderTool', () => {
  it('encodes entities', () => {
    renderTool()
    fireEvent.change(screen.getByLabelText('Input Text:'), { target: { value: '<div>A & B</div>' } })
    fireEvent.click(screen.getByRole('button', { name: 'Encode' }))
    expect(screen.getByLabelText('Output Text:')).toHaveValue('&lt;div&gt;A &amp; B&lt;/div&gt;')
  })

  it('decodes entities', () => {
    renderTool()
    fireEvent.click(screen.getByRole('button', { name: 'Decode HTML Entities' }))
    fireEvent.change(screen.getByLabelText('Input Text:'), { target: { value: '&lt;strong&gt;Hello&lt;/strong&gt;' } })
    fireEvent.click(screen.getByRole('button', { name: 'Decode' }))
    expect(screen.getByLabelText('Output Text:')).toHaveValue('<strong>Hello</strong>')
  })

  it('handles empty input, copy and reset', async () => {
    renderTool()
    fireEvent.click(screen.getByRole('button', { name: 'Encode' }))
    expect(screen.getByText('Please enter some text to process.')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Input Text:'), { target: { value: 'hello' } })
    fireEvent.click(screen.getByRole('button', { name: 'Encode' }))
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello')
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByLabelText('Input Text:')).toHaveValue('')
    expect(screen.getByLabelText('Output Text:')).toHaveValue('')
  })
})
