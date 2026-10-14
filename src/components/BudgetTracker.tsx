import { useState, type FormEvent } from 'react'
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import type { BudgetDraft, BudgetDraftErrors, BudgetItem, BudgetType } from '../types'
import { calculateStatistics, isCurrentMonth, validateBudgetDraft } from '../utils/budget'
import BudgetItems from './BudgetItems'

type BudgetTrackerProps = {
  items: BudgetItem[]
  monthlyLimit: number
  onAdd: (draft: BudgetDraft) => void
  onDelete?: (id: string) => void
}

const today = () => dayjs().format('YYYY-MM-DD')

const emptyDraft = (): BudgetDraft => ({
  description: '',
  amount: '',
  type: 'Income',
  date: today(),
})

export default function BudgetTracker({ items, monthlyLimit, onAdd, onDelete }: BudgetTrackerProps) {
  const [draft, setDraft] = useState<BudgetDraft>(emptyDraft)
  const [errors, setErrors] = useState<BudgetDraftErrors>({})

  const monthlyExpenses = items
    .filter((item) => item.type === 'Expense' && isCurrentMonth(item.date))
    .reduce((total, item) => total + Math.abs(item.amount), 0)
  const statistics = calculateStatistics(items)

  function updateDraft(field: keyof BudgetDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateBudgetDraft(draft)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onAdd(draft)
    setDraft(emptyDraft())
    setErrors({})
  }

  return (
    <Stack spacing={3}>
      <Paper className="page-heading" elevation={0}>
        <Typography className="eyebrow" component="p">
          Step 1 · Step 2 · Step 3
        </Typography>
        <Typography component="h1" variant="h4">
          Budget Tracker
        </Typography>
        <Typography color="text.secondary">
          Record income and expenses. Expenses are stored as negative values automatically.
        </Typography>
      </Paper>

      <Paper component="form" elevation={1} onSubmit={handleSubmit} sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={2}>
          {errors.description || errors.amount || errors.date ? (
            <Alert role="alert" severity="error">
              {[errors.description, errors.amount, errors.date].filter(Boolean).join(' ')}
            </Alert>
          ) : null}
          <Stack direction={{ md: 'row', xs: 'column' }} spacing={2}>
            <TextField
              error={Boolean(errors.description)}
              fullWidth
              helperText={errors.description}
              id="description"
              label="Description"
              onChange={(event) => updateDraft('description', event.target.value)}
              value={draft.description}
            />
            <TextField
              error={Boolean(errors.amount)}
              fullWidth
              helperText={errors.amount}
              id="amount"
              inputProps={{ inputMode: 'decimal', min: 0, step: '0.01' }}
              label="Amount"
              onChange={(event) => updateDraft('amount', event.target.value)}
              type="text"
              value={draft.amount}
            />
          </Stack>
          <Stack direction={{ md: 'row', xs: 'column' }} spacing={2}>
            <FormControl fullWidth error={Boolean(errors.type)}>
              <InputLabel htmlFor="type">Type</InputLabel>
              <NativeSelect
                id="type"
                inputProps={{ 'aria-label': 'Type' }}
                onChange={(event) => updateDraft('type', event.target.value as BudgetType)}
                value={draft.type}
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </NativeSelect>
              <FormHelperText>{errors.type}</FormHelperText>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="YYYY-MM-DD"
                label="Date"
                onChange={(value) => updateDraft('date', value?.isValid() ? value.format('YYYY-MM-DD') : '')}
                slotProps={{
                  textField: {
                    error: Boolean(errors.date),
                    fullWidth: true,
                    helperText: errors.date,
                  },
                }}
                value={draft.date ? dayjs(draft.date) : null}
              />
            </LocalizationProvider>
          </Stack>
          <Button size="large" type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </Paper>

      <Stack direction={{ md: 'row', xs: 'column' }} spacing={2}>
        <Paper className="summary-card" elevation={0}>
          <Typography color="text.secondary" variant="body2">Current balance</Typography>
          <Typography color={statistics.balance >= 0 ? 'success.main' : 'error.main'} variant="h5">
            €{statistics.balance.toFixed(2)}
          </Typography>
        </Paper>
        <Paper className="summary-card" elevation={0}>
          <Typography color="text.secondary" variant="body2">Monthly expenses</Typography>
          <Typography variant="h5">€{monthlyExpenses.toFixed(2)}</Typography>
        </Paper>
      </Stack>

      {monthlyExpenses > monthlyLimit ? (
        <Alert severity="warning">
          Monthly limit of €{monthlyLimit.toFixed(2)} exceeded.
        </Alert>
      ) : null}

      <BudgetItems items={items} onDelete={onDelete ?? (() => undefined)} />
      <Box />
    </Stack>
  )
}
