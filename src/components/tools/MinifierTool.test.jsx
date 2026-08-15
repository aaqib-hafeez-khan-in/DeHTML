import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MinifierTool from './MinifierTool'
import { ToastProvider } from '../../context/ToastContext'

const renderTool = () => render(<ToastProvider><MinifierTool /></ToastProvider>)

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
    fireEvent.change(screen.getByLabelText('Original HTML Code'), { target: { value: '<div>  <!-- x --> <span> hi </span> </div>' } })
    fireEvent.click(screen.getByRole('button', { name: 'Minify Code' }))
    expect(screen.getByLabelText('Minified Result')).toHaveValue('<div><span> hi </span></div>')
  })

  it('minifies css and js', () => {
    renderTool()
    fireEvent.click(screen.getByRole('button', { name: 'CSS' }))
    fireEvent.change(screen.getByLabelText('Original CSS Code'), { target: { value: 'a { color: red; padding: 0 1px; }' } })
    fireEvent.click(screen.getByRole('button', { name: 'Minify Code' }))
    expect(screen.getByLabelText('Minified Result')).toHaveValue('a{color:red;padding:0 1px;}')

    fireEvent.click(screen.getByRole('button', { name: 'JS' }))
    fireEvent.change(screen.getByLabelText('Original JS Code'), { target: { value: 'const x = 1 + 2; // comment' } })
    fireEvent.click(screen.getByRole('button', { name: 'Minify Code' }))
    expect(screen.getByLabelText('Minified Result')).toHaveValue('const x=1+2;')
  })

  it('copies and clears output', () => {
    renderTool()
    fireEvent.change(screen.getByLabelText('Original HTML Code'), { target: { value: '<p>Hello</p>' } })
    fireEvent.click(screen.getByRole('button', { name: 'Minify Code' }))
    fireEvent.click(screen.getByRole('button', { name: 'Copy Output' }))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('<p>Hello</p>')
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }))
    expect(screen.getByLabelText('Original HTML Code')).toHaveValue('')
    expect(screen.getByLabelText('Minified Result')).toHaveValue('')
  })
})
