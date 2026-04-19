import { useState } from 'react'
import { Box } from '@mui/material'
import { Variable } from '../../../shared/types/Variable'
import useEnvironmentVariables from './hooks/useEnvironmentVariables'
import {
  AddVariableDialog,
  DeleteVariableDialog,
  VariableDrawer,
  VariablesHeader,
  VariablesTable
} from './components'

const EnvironmentVariables = () => {
  const { variables, createVariable, deleteVariable } = useEnvironmentVariables()
  const [selected, setSelected] = useState<Variable | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<Variable | null>(null)

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return
    await deleteVariable(pendingDelete.id)
    setPendingDelete(null)
    setSelected(null)
  }

  return (
    <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          pt: 5,
          px: 4,
          pb: 0,
          bgcolor: 'background.paper'
        }}
      >
        <VariablesHeader onAdd={() => setAddOpen(true)} />
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <VariablesTable
            variables={variables}
            selectedId={selected?.id ?? null}
            onSelect={setSelected}
          />
        </Box>
      </Box>

      <VariableDrawer
        variable={selected}
        onClose={() => setSelected(null)}
        onDelete={(variable) => setPendingDelete(variable)}
      />
      <AddVariableDialog onSave={createVariable} open={addOpen} onClose={() => setAddOpen(false)} />
      <DeleteVariableDialog
        open={!!pendingDelete}
        variableName={pendingDelete?.name ?? null}
        onConfirm={handleConfirmDelete}
        onClose={() => setPendingDelete(null)}
      />
    </Box>
  )
}

export default EnvironmentVariables
