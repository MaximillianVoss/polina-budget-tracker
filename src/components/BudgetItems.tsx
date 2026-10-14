import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { DataGrid, type GridColDef, type GridRowParams } from '@mui/x-data-grid'
import type { BudgetItem } from '../types'

type BudgetItemsProps = {
  items: BudgetItem[]
  onDelete: (id: string) => void
}

function formatAmount(amount: number) {
  return `${amount < 0 ? '-' : ''}€${Math.abs(amount).toFixed(2)}`
}

export default function BudgetItems({ items, onDelete }: BudgetItemsProps) {
  const columns: GridColDef<BudgetItem>[] = [
    { field: 'description', headerName: 'Description', flex: 1.4, minWidth: 170 },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.8,
      minWidth: 120,
      valueFormatter: (value) => formatAmount(Number(value)),
      cellClassName: (params) => (Number(params.value) < 0 ? 'expense-cell' : 'income-cell'),
    },
    { field: 'date', headerName: 'Date', flex: 0.8, minWidth: 130 },
    {
      field: 'type',
      headerName: 'Type',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          color={params.row.type === 'Income' ? 'success' : 'error'}
          label={params.row.type}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      flex: 0.7,
      minWidth: 115,
      renderCell: (params) => (
        <Button
          aria-label={`Delete ${params.row.description}`}
          color="error"
          onClick={() => onDelete(params.row.id)}
          size="small"
        >
          Delete
        </Button>
      ),
    },
  ]

  const grouped = items.reduce(
    (result, item) => {
      result[item.type] += 1
      return result
    },
    { Income: 0, Expense: 0 },
  )

  return (
    <section aria-labelledby="budget-items-title">
      <Stack alignItems="center" direction="row" justifyContent="space-between" mb={1.5}>
        <Typography component="h2" id="budget-items-title" variant="h5">
          Budget items
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color="success" label={`Income: ${grouped.Income}`} size="small" />
          <Chip color="error" label={`Expense: ${grouped.Expense}`} size="small" />
        </Stack>
      </Stack>
      {items.length === 0 ? (
        <Box className="empty-state">
          <Typography color="text.secondary">No budget items yet.</Typography>
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          <DataGrid
            autoHeight
            columns={columns}
            disableRowSelectionOnClick
            getRowClassName={(params: GridRowParams<BudgetItem>) =>
              params.row.type === 'Income' ? 'income-row' : 'expense-row'
            }
            getRowId={(row) => row.id}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
            pageSizeOptions={[5, 10, 25]}
            rows={items}
            sx={{
              border: 0,
              '& .income-row': { backgroundColor: 'rgba(46, 125, 50, 0.04)' },
              '& .expense-row': { backgroundColor: 'rgba(211, 47, 47, 0.04)' },
              '& .income-cell': { color: 'success.main', fontWeight: 700 },
              '& .expense-cell': { color: 'error.main', fontWeight: 700 },
            }}
          />
        </Box>
      )}
    </section>
  )
}
