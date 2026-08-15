import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from './Header'
import Footer from './Footer'
import TabBar from './TabBar'
import StatsPanel from './StatsPanel'
import ToastContainer from './ToastContainer'
import { ToastProvider, useToast } from '../context/ToastContext'

const ToastHarness = () => {
  const { addToast } = useToast()
  return <button onClick={() => addToast('Hello', 'success')}>Add toast</button>
}

describe('shared components', () => {
  it('renders header and footer content', () => {
    render(<><Header /><Footer /></>)
    expect(screen.getByText('DeHTML Suite')).toBeInTheDocument()
    expect(screen.getByText('Advanced Web Developer Utilities')).toBeInTheDocument()
    expect(screen.getByText('Legacy Version').closest('a')).toHaveAttribute('href', './legacy/index.html')
    expect(screen.getByText('GitHub Repo')).toHaveAttribute('href', 'https://github.com/AaqibhafeezKhan/DeHTML')
  })

  it('renders tab bar and handles changes', () => {
    const onChange = vi.fn()
    render(<TabBar tabs={[{ id: 'a', label: 'Alpha' }, { id: 'b', label: 'Beta' }]} active="a" onChange={onChange} />)
    expect(screen.getByRole('button', { name: 'Alpha' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Beta' }))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('renders stats and zero counts for whitespace', () => {
    const { rerender } = render(<StatsPanel text="Hello world\nfrom DeHTML" />)
    expect(screen.getByText('24')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    rerender(<StatsPanel text="   " />)
    expect(screen.getAllByText('0').length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText('1')).toBeInTheDocument()
    rerender(<StatsPanel text="" />)
    expect(screen.queryByText('Characters')).not.toBeInTheDocument()
  })

  it('adds and expires a toast', () => {
    vi.useFakeTimers()
    try {
      render(<ToastProvider><ToastHarness /><ToastContainer /></ToastProvider>)
      fireEvent.click(screen.getByRole('button', { name: 'Add toast' }))
      expect(screen.getByText('Hello')).toBeInTheDocument()
      act(() => vi.advanceTimersByTime(3000))
      expect(screen.queryByText('Hello')).not.toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })
})
