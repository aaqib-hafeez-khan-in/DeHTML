import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DiffTool from './DiffTool'
import { ToastProvider } from '../../context/ToastContext'

describe('DiffTool', () => {
  const renderTool = () => render(<ToastProvider><DiffTool /></ToastProvider>)

  it('warns when both fields are empty', () => {
    renderTool()
    fireEvent.click(screen.getByRole('button', { name: 'Compare Texts' }))
    expect(screen.getByText('Please enter text in both fields to compare.')).toBeInTheDocument()
  })

  it('shows equal, removed and added lines', () => {
    renderTool()
    fireEvent.change(screen.getByPlaceholderText('Paste original text here...'), { target: { value: 'same\nold' } })
    fireEvent.change(screen.getByPlaceholderText('Paste modified text here...'), { target: { value: 'same\nnew\nextra' } })
    fireEvent.click(screen.getByRole('button', { name: 'Compare Texts' }))
    expect(screen.getByText('Difference Output:')).toBeInTheDocument()
    expect(screen.getByText('same')).toBeInTheDocument()
    expect(screen.getByText('- old')).toBeInTheDocument()
    expect(screen.getByText('+ new')).toBeInTheDocument()
    expect(screen.getByText('+ extra')).toBeInTheDocument()
  })

  it('clears the comparison', () => {
    renderTool()
    fireEvent.change(screen.getByPlaceholderText('Paste original text here...'), { target: { value: 'a' } })
    fireEvent.change(screen.getByPlaceholderText('Paste modified text here...'), { target: { value: 'b' } })
    fireEvent.click(screen.getByRole('button', { name: 'Compare Texts' }))
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }))
    expect(screen.queryByText('Difference Output:')).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('Paste original text here...')).toHaveValue('')
  })
})
