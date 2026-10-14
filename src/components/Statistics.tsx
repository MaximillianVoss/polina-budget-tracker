import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import type { BudgetItem } from '../types'
import { calculateStatistics } from '../utils/budget'

type StatisticsProps = { items: BudgetItem[] }

export default function Statistics({ items }: StatisticsProps) {
  const statistics = calculateStatistics(items)
  const cards = [
    { label: 'Total income', value: statistics.income, color: 'success.main' },
    { label: 'Total expenses', value: statistics.expenses, color: 'error.main' },
    { label: 'Saldo', value: statistics.balance, color: statistics.balance >= 0 ? 'success.main' : 'error.main' },
  ]

  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">Statistics</Typography>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid key={card.label} size={{ md: 4, xs: 12 }}>
            <Card elevation={1}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>{card.label}</Typography>
                <Typography color={card.color} variant="h4">
                  {card.label === 'Saldo' && card.value >= 0 ? '+' : ''}€{card.value.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
