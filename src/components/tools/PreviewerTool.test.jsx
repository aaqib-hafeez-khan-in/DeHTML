import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PreviewerTool from './PreviewerTool'

describe('PreviewerTool', () => {
  it('renders the default preview', () => {
    render(<PreviewerTool />)
    expect(screen.getByRole('textbox')).toHaveValue('<h1>Hello Previewer!</h1>\n<style>\n  h1 { color: #ec4899; }\n</style>')
    expect(screen.getByTitle('Preview')).toHaveAttribute('sandbox', 'allow-scripts')
  })

  it('updates, clears and restores the demo', () => {
    render(<PreviewerTool />)
    const editor = screen.getByRole('textbox')
    fireEvent.change(editor, { target: { value: '<p>Custom</p>' } })
    expect(editor).toHaveValue('<p>Custom</p>')
    fireEvent.click(screen.getByRole('button', { name: 'Clear Editor' }))
    expect(editor).toHaveValue('')
    fireEvent.click(screen.getByRole('button', { name: 'Reset Demo' }))
    expect(editor).toHaveValue('<h1>Hello Previewer!</h1>\n<style>\n  h1 { color: #ec4899; }\n</style>')
  })
})
