import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Variable } from '../../../shared/types/Variable'
import useEnvironmentVariables from './hooks/useEnvironmentVariables'
import VariablesTable from './components/VariablesTable'
import VariableDrawer from './components/VariableDrawer'

function EnvironmentVariables(): React.JSX.Element {
  const variables = useEnvironmentVariables()
  const [selected, setSelected] = useState<Variable | null>(null)

  return (
    <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <Box sx={{ flex: 1, overflow: 'auto', py: 5, px: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Environment Variables
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Manage variables across environments.
        </Typography>
        <VariablesTable
          variables={variables}
          selectedId={selected?.id ?? null}
          onSelect={setSelected}
        />
      </Box>
      <VariableDrawer variable={selected} onClose={() => setSelected(null)} />
    </Box>
  )
}

export default EnvironmentVariables
