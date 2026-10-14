import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'
import BudgetTracker from './BudgetTracker'
import type { BudgetDraft, BudgetItem } from '../types'

const emptyItems: BudgetItem[] = []

afterEach(() => {
  cleanup()
})

describe('BudgetTracker form', () => {
  test('shows validation errors and does not submit an empty form', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn<(draft: BudgetDraft) => void>()
    render(<BudgetTracker items={emptyItems} monthlyLimit={1000} onAdd={onAdd} />)

    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Description is required.')
    expect(onAdd).not.toHaveBeenCalled()
  })

  test('submits an expense draft and clears the form', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn<(draft: BudgetDraft) => void>()
    render(<BudgetTracker items={emptyItems} monthlyLimit={1000} onAdd={onAdd} />)

    await user.type(screen.getByLabelText('Description'), 'Lunch')
    await user.clear(screen.getByLabelText('Amount'))
    await user.type(screen.getByLabelText('Amount'), '12')
    await user.selectOptions(screen.getByLabelText('Type'), 'Expense')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(onAdd).toHaveBeenCalledWith({
      description: 'Lunch',
      amount: '12',
      type: 'Expense',
      date: expect.any(String),
    })
    expect(screen.getByLabelText('Description')).toHaveValue('')
    expect(screen.getByLabelText('Amount')).toHaveValue('')
  })
})
