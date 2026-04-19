import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

const DeleteVariableDialog = ({
  open,
  variableName,
  onConfirm,
  onClose
}: {
  open: boolean
  variableName: string | null
  onConfirm: () => void
  onClose: () => void
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete variable?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        &quot;{variableName}&quot; will be permanently deleted.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} color="error" variant="contained">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
)

export default DeleteVariableDialog
