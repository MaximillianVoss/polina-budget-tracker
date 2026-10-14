import { describe, expect, test } from 'vitest'
import {
  calculateStatistics,
  isCurrentMonth,
  toBudgetItem,
  validateBudgetDraft,
} from './budget'
import type { BudgetDraft, BudgetItem } from '../types'

describe('budget domain rules', () => {
  test('rejects incomplete and invalid drafts', () => {
    const errors = validateBudgetDraft({
      description: ' ',
      amount: '-4',
      type: 'Expense',
      date: 'not-a-date',
    })

    expect(errors.description).toBe('Description is required.')
    expect(errors.amount).toBe('Amount must be a non-negative number.')
    expect(errors.date).toBe('Date is required and must be valid.')
  })

  test('normalizes income and expense signs', () => {
    const income: BudgetDraft = {
      description: 'Salary',
      amount: '450.70',
      type: 'Income',
      date: '2026-09-01',
    }
    const expense: BudgetDraft = { ...income, description: 'Lunch', type: 'Expense' }

    expect(toBudgetItem(income, 'income-1').amount).toBe(450.7)
    expect(toBudgetItem(expense, 'expense-1').amount).toBe(-450.7)
  })

  test('calculates income, expenses and balance', () => {
    const items: BudgetItem[] = [
      { id: '1', description: 'Salary', amount: 450, type: 'Income', date: '2026-09-01' },
      { id: '2', description: 'Lunch', amount: -12, type: 'Expense', date: '2026-09-02' },
      { id: '3', description: 'Book', amount: -20, type: 'Expense', date: '2026-09-03' },
    ]

    expect(calculateStatistics(items)).toEqual({ income: 450, expenses: 32, balance: 418 })
  })

  test('recognizes entries in the current month', () => {
    expect(isCurrentMonth('2026-09-01', '2026-09-15')).toBe(true)
    expect(isCurrentMonth('2026-08-31', '2026-09-15')).toBe(false)
  })
})
