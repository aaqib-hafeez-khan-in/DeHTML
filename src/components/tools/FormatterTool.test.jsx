import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import FormatterTool from './FormatterTool'
import { ToastProvider } from '../../context/ToastContext'

const renderTool = () => render(<ToastProvider><FormatterTool /></ToastProvider>)

beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
})

describe('FormatterTool', () => {
  it('rejects empty input', () => {
    renderTool()
    fireEvent.click(screen.getByRole('button', { name: 'Format HTML' }))
    expect(screen.getByText('Please enter some HTML to format.')).toBeInTheDocument()
  })

  it('formats nested and void elements', () => {
    renderTool()
    fireEvent.change(screen.getByLabelText('Input HTML:'), { target: { value: '<div><p>Hello</p><img src="x"><br><input></div>' } })
    fireEvent.click(screen.getByRole('button', { name: 'Format HTML' }))
    const output = screen.getByLabelText('Formatted HTML:').value
    expect(output).toContain('<div>')
    expect(output).toContain('<p>Hello</p>')
    expect(output).toContain('<img src="x">')
    expect(output).toContain('<br>')
  })

  it('copies output and resets state', () => {
    renderTool()
    fireEvent.change(screen.getByLabelText('Input HTML:'), { target: { value: '<p>Hello</p>' } })
    fireEvent.click(screen.getByRole('button', { name: 'Format HTML' }))
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }))
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByLabelText('Input HTML:')).toHaveValue('')
    expect(screen.getByLabelText('Formatted HTML:')).toHaveValue('')
  })
})
