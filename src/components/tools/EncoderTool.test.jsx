import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EncoderTool from './EncoderTool'
import ToastContainer from '../ToastContainer'
import { ToastProvider } from '../../context/ToastContext'

const renderTool = () => render(<ToastProvider><EncoderTool /><ToastContainer /></ToastProvider>)

beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
})

describe('EncoderTool', () => {
  it('encodes entities', async () => {
    renderTool()
    fireEvent.change(screen.getByPlaceholderText('Paste your text to encode here...'), { target: { value: '<div>A & B</div>' } })
    fireEvent.click(screen.getByRole('button', { name: 'Encode' }))
    await waitFor(() => expect(screen.getAllByRole('textbox')[1]).toHaveValue('&lt;div&gt;A &amp; B&lt;/div&gt;'))
  })

  it('decodes entities', async () => {
    renderTool()
    fireEvent.click(screen.getByRole('button', { name: 'Decode HTML Entities' }))
    fireEvent.change(screen.getByPlaceholderText('Paste your text to decode here...'), { target: { value: '&lt;strong&gt;Hello&lt;/strong&gt;' } })
    fireEvent.click(screen.getByRole('button', { name: 'Decode' }))
    await waitFor(() => expect(screen.getAllByRole('textbox')[1]).toHaveValue('<strong>Hello</strong>'))
  })

  it('handles empty input, copy and reset', async () => {
    renderTool()
    fireEvent.click(screen.getByRole('button', { name: 'Encode' }))
    expect(screen.getByText('Please enter some text to process.')).toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText('Paste your text to encode here...'), { target: { value: 'hello' } })
    fireEvent.click(screen.getByRole('button', { name: 'Encode' }))
    await waitFor(() => expect(screen.getAllByRole('textbox')[1]).toHaveValue('hello'))
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }))
    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello'))
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('')
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('')
  })
})
