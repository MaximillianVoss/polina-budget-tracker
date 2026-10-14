import { Box, Paper, Typography } from '@mui/material'

export default function Home() {
  return (
    <Paper className="hero-card" elevation={0}>
      <Box>
        <Typography className="eyebrow" component="p">
          Personal finance
        </Typography>
        <Typography component="h1" variant="h3" gutterBottom>
          Welcome to Budget Tracker
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 620 }}>
          Add income and expenses, see the current balance, and use Statistics
          to understand where your money goes.
        </Typography>
      </Box>
    </Paper>
  )
}
