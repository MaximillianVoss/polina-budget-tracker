import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
})

describe('Budget Tracker routes', () => {
  test('keeps budget items while navigating to statistics', async () => {
    const user = userEvent.setup()
    window.history.pushState({}, '', '/budget')
    render(<App />)

    await user.type(screen.getByLabelText('Description'), 'Salary')
    await user.clear(screen.getByLabelText('Amount'))
    await user.type(screen.getByLabelText('Amount'), '450')
    await user.selectOptions(screen.getByLabelText('Type'), 'Income')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await user.click(screen.getByRole('link', { name: 'Statistics' }))

    expect(screen.getByRole('heading', { name: 'Statistics' })).toBeInTheDocument()
    expect(screen.getByText('Total income')).toBeInTheDocument()
    expect(screen.getByText('€450.00')).toBeInTheDocument()
  })
})
