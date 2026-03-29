import { Chip } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import TuneIcon from '@mui/icons-material/Tune'

const TypeBadge = ({ type }: { type: 'variable' | 'secret' }) => {
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

export default TypeBadge
