import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Variable } from '../../../shared/types/Variable'
import useEnvironmentVariables from './hooks/useEnvironmentVariables'
import VariablesTable from './components/VariablesTable'
import VariableDrawer from './components/VariableDrawer'
import AddVariableDialog from './components/AddVariableDialog'

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 0.5,
            flexShrink: 0
          }}
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
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexShrink: 0 }}>
          Manage variables across environments.
        </Typography>
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
      <Dialog open={pendingDelete !== null} onClose={() => setPendingDelete(null)}>
        <DialogTitle>Delete variable?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            &quot;{pendingDelete?.name}&quot; will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPendingDelete(null)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default EnvironmentVariables
