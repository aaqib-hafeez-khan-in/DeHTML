import '@testing-library/jest-dom'

Object.defineProperty(HTMLElement.prototype, 'innerText', {
  configurable: true,
  get() {
    return this.textContent || ''
  },
  set(value) {
    this.textContent = value
  },
})
