import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import Footer from './Footer'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Footer', () => {
  it('renders correctly', async () => {
    const { container } = render(<Footer />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
