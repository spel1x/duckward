import { useState, useEffect } from 'react'
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LockIcon from '@mui/icons-material/Lock'
import TuneIcon from '@mui/icons-material/Tune'
import { Variable } from '../../shared/types/Variable'

const ENV_COLORS: Record<string, 'success' | 'warning' | 'secondary' | 'error' | 'default'> = {
  dev: 'success',
  qa: 'warning',
  staging: 'secondary',
  prod: 'error',
}

function EnvChip({ env }: { env: string }): React.JSX.Element {
  return (
    <Chip
      label={env}
      color={ENV_COLORS[env] ?? 'default'}
      size="small"
      sx={{ fontWeight: 600, fontSize: '0.7rem' }}
    />
  )
}

function TypeBadge({ type }: { type: 'variable' | 'secret' }): React.JSX.Element {
  return type === 'secret' ? (
    <Chip
      icon={<LockIcon sx={{ fontSize: '0.85rem !important' }} />}
      label="secret"
      size="small"
      color="error"
      sx={{ fontSize: '0.7rem', fontWeight: 600 }}
    />
  ) : (
    <Chip
      icon={<TuneIcon sx={{ fontSize: '0.85rem !important' }} />}
      label="config"
      size="small"
      color="primary"
      sx={{ fontSize: '0.7rem', fontWeight: 600 }}
    />
  )
}

const HEADER_CELL_SX = {
  fontWeight: 700,
  textTransform: 'uppercase',
  fontSize: '0.7rem',
  letterSpacing: '0.08em',
  color: 'text.secondary',
}

function VariableDrawer({ variable, onClose }: { variable: Variable | null; onClose: () => void }): React.JSX.Element {
  const open = variable !== null

  return (
    <Box
      sx={{
        width: open ? 360 : 0,
        flexShrink: 0,
        overflow: 'hidden',
        transition: 'width 0.25s ease',
        borderLeft: open ? 1 : 0,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ width: 360, p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%', overflow: 'auto' }}>
        {variable && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  Variable
                </Typography>
                <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'monospace', wordBreak: 'break-all', lineHeight: 1.3, mt: 0.5 }}>
                  {variable.name}
                </Typography>
              </Box>
              <IconButton size="small" onClick={onClose} sx={{ mt: -0.5, ml: 1 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TypeBadge type={variable.type} />
              {variable.description && (
                <Typography variant="body2" color="text.secondary">
                  {variable.description}
                </Typography>
              )}
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Values
              </Typography>
              {variable.values.map((ev) => (
                <Box key={ev.env} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <EnvChip env={ev.env} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'monospace',
                      bgcolor: 'background.default',
                      px: 1.5,
                      py: 1,
                      borderRadius: 1,
                      wordBreak: 'break-all',
                      color: 'text.primary',
                    }}
                  >
                    {ev.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

function App(): React.JSX.Element {
  const [variables, setVariables] = useState<Variable[]>([])
  const [selected, setSelected] = useState<Variable | null>(null)

  useEffect(() => {
    window.api.getVariables().then(setVariables)
  }, [])

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ flex: 1, overflow: 'auto', py: 5, px: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Environment Variables
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Manage variables across environments.
        </Typography>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={HEADER_CELL_SX}>Name</TableCell>
                <TableCell sx={HEADER_CELL_SX}>Description</TableCell>
                <TableCell sx={HEADER_CELL_SX}>Type</TableCell>
                <TableCell sx={HEADER_CELL_SX}>Environments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {variables.map((v) => (
                <TableRow
                  key={v.id}
                  hover
                  selected={selected?.id === v.id}
                  onClick={() => setSelected(selected?.id === v.id ? null : v)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'text.primary' }}>
                      {v.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {v.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TypeBadge type={v.type} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {v.values.map((ev) => (
                        <EnvChip key={ev.env} env={ev.env} />
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <VariableDrawer variable={selected} onClose={() => setSelected(null)} />
    </Box>
  )
}

export default App
