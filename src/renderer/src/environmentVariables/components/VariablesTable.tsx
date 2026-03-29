import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { Variable } from '../../../../shared/types/Variable'
import EnvChip from '../../shared/components/EnvChip'
import TypeBadge from '../../shared/components/TypeBadge'

const HEADER_CELL_SX = {
  fontWeight: 700,
  textTransform: 'uppercase',
  fontSize: '0.7rem',
  letterSpacing: '0.08em',
  color: 'text.secondary'
}

const VariablesTable = ({
  variables,
  selectedId,
  onSelect
}: {
  variables: Variable[]
  selectedId: string | null
  onSelect: (variable: Variable | null) => void
}) => {
  return (
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
              selected={selectedId === v.id}
              onClick={() => onSelect(selectedId === v.id ? null : v)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>
                <Typography
                  variant="caption"
                  sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'text.primary' }}
                >
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
  )
}

export default VariablesTable
