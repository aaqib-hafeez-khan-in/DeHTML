import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MinifierTool from './MinifierTool'
import ToastContainer from '../ToastContainer'
import { ToastProvider } from '../../context/ToastContext'

const renderTool = () => render(<ToastProvider><MinifierTool /><ToastContainer /></ToastProvider>)

beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
})

describe('MinifierTool', () => {
  it('handles empty input', () => {
    renderTool()
    fireEvent.click(screen.getByRole('button', { name: 'Minify Code' }))
    expect(screen.getByText('Please enter some code to minify')).toBeInTheDocument()
  })

  it('minifies html', () => {
    renderTool()
    fireEvent.change(screen.getByPlaceholderText('Paste your HTML here...'), { target: { value: '<div>  <!-- x --> <span> hi </span> </div>' } })
    fireEvent.click(screen.getByRole('button', { name: 'Minify Code' }))
    expect(screen.getByPlaceholderText('Minified output will appear here...')).toHaveValue('<div><span> hi </span></div>')
  })

  it('minifies css and js', () => {
    renderTool()
    fireEvent.click(screen.getByRole('button', { name: 'CSS' }))
    fireEvent.change(screen.getByPlaceholderText('Paste your CSS here...'), { target: { value: 'a { color: red; padding: 0 1px; }' } })
    fireEvent.click(screen.getByRole('button', { name: 'Minify Code' }))
    expect(screen.getByPlaceholderText('Minified output will appear here...')).toHaveValue('a{color:red;padding:0 1px;}')

    fireEvent.click(screen.getByRole('button', { name: 'JS' }))
    fireEvent.change(screen.getByPlaceholderText('Paste your JS here...'), { target: { value: 'const x = 1 + 2; // comment' } })
    fireEvent.click(screen.getByRole('button', { name: 'Minify Code' }))
    expect(screen.getByPlaceholderText('Minified output will appear here...')).toHaveValue('const x=1+2;')
  })

  it('copies and clears output', async () => {
    renderTool()
    fireEvent.change(screen.getByPlaceholderText('Paste your HTML here...'), { target: { value: '<p>Hello</p>' } })
    fireEvent.click(screen.getByRole('button', { name: 'Minify Code' }))
    fireEvent.click(screen.getByRole('button', { name: 'Copy Output' }))
    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith('<p>Hello</p>'))
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }))
    expect(screen.getByPlaceholderText('Paste your HTML here...')).toHaveValue('')
    expect(screen.getByPlaceholderText('Minified output will appear here...')).toHaveValue('')
  })
})
