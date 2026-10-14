export type BudgetType = 'Income' | 'Expense'

export type BudgetDraft = {
  description: string
  amount: string
  type: BudgetType
  date: string
}

export type BudgetItem = {
  id: string
  description: string
  amount: number
  type: BudgetType
  date: string
}

export type BudgetDraftErrors = Partial<Record<keyof BudgetDraft, string>>

export type BudgetStatistics = {
  income: number
  expenses: number
  balance: number
}
