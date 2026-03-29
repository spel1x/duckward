import { Chip } from '@mui/material'

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

export default EnvChip
