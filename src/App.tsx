import { useState } from 'react'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { BrowserRouter, Link as RouterLink, NavLink, Route, Routes } from 'react-router-dom'
import type { BudgetDraft, BudgetItem } from './types'
import { toBudgetItem } from './utils/budget'
import Home from './components/Home'
import BudgetTracker from './components/BudgetTracker'
import Statistics from './components/Statistics'

function createId() {
  if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function Navigation() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography component={RouterLink} sx={{ color: 'inherit', flexGrow: 1, textDecoration: 'none' }} to="/" variant="h6">
          Budget Tracker
        </Typography>
        <Button color="inherit" component={NavLink} to="/">Home</Button>
        <Button color="inherit" component={NavLink} to="/budget">Budget</Button>
        <Button color="inherit" component={NavLink} to="/statistics">Statistics</Button>
      </Toolbar>
    </AppBar>
  )
}

export default function App() {
  const [items, setItems] = useState<BudgetItem[]>([])
  const monthlyLimit = 1000

  function addItem(draft: BudgetDraft) {
    setItems((current) => [...current, toBudgetItem(draft, createId())])
  }

  function deleteItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  return (
    <BrowserRouter>
      <Navigation />
      <Box component="main" sx={{ py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route
              element={<BudgetTracker items={items} monthlyLimit={monthlyLimit} onAdd={addItem} onDelete={deleteItem} />}
              path="/budget"
            />
            <Route element={<Statistics items={items} />} path="/statistics" />
            <Route element={<Home />} path="*" />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  )
}
