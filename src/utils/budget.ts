import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import type {
  BudgetDraft,
  BudgetDraftErrors,
  BudgetItem,
  BudgetStatistics,
} from '../types'

dayjs.extend(customParseFormat)

const ISO_DATE_FORMAT = 'YYYY-MM-DD'

export function validateBudgetDraft(draft: BudgetDraft): BudgetDraftErrors {
  const errors: BudgetDraftErrors = {}
  const amount = Number(draft.amount)

  if (!draft.description.trim()) {
    errors.description = 'Description is required.'
  }

  if (!draft.amount.trim() || !Number.isFinite(amount) || amount < 0) {
    errors.amount = 'Amount must be a non-negative number.'
  }

  if (!draft.date || !dayjs(draft.date, ISO_DATE_FORMAT, true).isValid()) {
    errors.date = 'Date is required and must be valid.'
  }

  if (draft.type !== 'Income' && draft.type !== 'Expense') {
    errors.type = 'Type is required.'
  }

  return errors
}

export function toBudgetItem(draft: BudgetDraft, id: string): BudgetItem {
  const amount = Math.abs(Number(draft.amount))

  return {
    id,
    description: draft.description.trim(),
    amount: draft.type === 'Expense' ? -amount : amount,
    type: draft.type,
    date: draft.date,
  }
}

export function calculateStatistics(items: BudgetItem[]): BudgetStatistics {
  const income = items
    .filter((item) => item.type === 'Income')
    .reduce((total, item) => total + Math.abs(item.amount), 0)
  const expenses = items
    .filter((item) => item.type === 'Expense')
    .reduce((total, item) => total + Math.abs(item.amount), 0)

  return {
    income,
    expenses,
    balance: income - expenses,
  }
}

export function isCurrentMonth(date: string, today = dayjs().format(ISO_DATE_FORMAT)): boolean {
  return date.slice(0, 7) === today.slice(0, 7)
}
