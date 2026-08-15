import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the default strip tool and shared layout', () => {
    render(<App />)
    expect(screen.getByText('DeHTML Suite')).toBeInTheDocument()
    expect(screen.getByText('Advanced Web Developer Utilities')).toBeInTheDocument()
    expect(screen.getByText('Strip HTML Tags')).toBeInTheDocument()
    expect(screen.getByText('Legacy Version')).toBeInTheDocument()
  })

  it('switches through every tool tab', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Encode / Decode' }))
    expect(screen.getByText('Encode HTML Entities')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Diff Viewer' }))
    expect(screen.getByText('Compare Texts')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Formatter' }))
    expect(screen.getByText('Format HTML')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Minifier' }))
    expect(screen.getByText('Minify Code')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Previewer' }))
    expect(screen.getByTitle('Preview')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Strip Tags' }))
    expect(screen.getByText('Strip HTML Tags')).toBeInTheDocument()
  })
})
