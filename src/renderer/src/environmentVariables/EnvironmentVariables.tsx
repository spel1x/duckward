import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Variable } from '../../../shared/types/Variable'
import useEnvironmentVariables from './hooks/useEnvironmentVariables'
import VariablesTable from './components/VariablesTable'
import VariableDrawer from './components/VariableDrawer'
import AddVariableDialog from './components/AddVariableDialog'

const EnvironmentVariables = () => {
  const { variables, createVariable } = useEnvironmentVariables()
  const [selected, setSelected] = useState<Variable | null>(null)
  const [addOpen, setAddOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <Box sx={{ flex: 1, overflow: 'auto', py: 5, px: 4 }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}
        >
          <Typography variant="h5" fontWeight={700}>
            Environment Variables
          </Typography>
          <Button
            variant="contained"
            disableElevation
            startIcon={<AddIcon />}
            onClick={() => setAddOpen(true)}
          >
            Add Variable
          </Button>
        </Box>
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
      <AddVariableDialog onSave={createVariable} open={addOpen} onClose={() => setAddOpen(false)} />
    </Box>
  )
}

export default EnvironmentVariables
