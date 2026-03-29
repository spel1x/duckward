import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

interface EnvValueDraft {
  env: string
  value: string
}

interface VariableDraft {
  name: string
  description: string
  type: 'variable' | 'secret'
  values: EnvValueDraft[]
}

const EMPTY_DRAFT: VariableDraft = {
  name: '',
  description: '',
  type: 'variable',
  values: [{ env: '', value: '' }]
}

const AddVariableDialog = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  const [draft, setDraft] = useState<VariableDraft>(EMPTY_DRAFT)

  function handleClose(): void {
    setDraft(EMPTY_DRAFT)
    onClose()
  }

  function setField<K extends keyof VariableDraft>(key: K, value: VariableDraft[K]): void {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  function setEnvValue(index: number, field: keyof EnvValueDraft, value: string): void {
    setDraft((prev) => {
      const values = [...prev.values]
      values[index] = { ...values[index], [field]: value }
      return { ...prev, values }
    })
  }

  function addEnvValue(): void {
    setDraft((prev) => ({ ...prev, values: [...prev.values, { env: '', value: '' }] }))
  }

  function removeEnvValue(index: number): void {
    setDraft((prev) => ({ ...prev, values: prev.values.filter((_, i) => i !== index) }))
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>Add Variable</DialogTitle>

      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '16px !important' }}
      >
        <TextField
          label="Name"
          value={draft.name}
          onChange={(e) => setField('name', e.target.value)}
          fullWidth
          size="small"
          slotProps={{ input: { style: { fontFamily: 'monospace' } } }}
        />

        <TextField
          label="Description"
          value={draft.description}
          onChange={(e) => setField('description', e.target.value)}
          fullWidth
          size="small"
        />

        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}
          >
            Type
          </Typography>
          <RadioGroup
            row
            value={draft.type}
            onChange={(e) => setField('type', e.target.value as 'variable' | 'secret')}
            sx={{ mt: 0.5 }}
          >
            <FormControlLabel value="variable" control={<Radio size="small" />} label="Config" />
            <FormControlLabel value="secret" control={<Radio size="small" />} label="Secret" />
          </RadioGroup>
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}
          >
            Values
          </Typography>

          {draft.values.map((ev, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                label="Environment"
                value={ev.env}
                onChange={(e) => setEnvValue(i, 'env', e.target.value)}
                size="small"
                sx={{ width: 140 }}
                placeholder="dev"
              />
              <TextField
                label="Value"
                value={ev.value}
                onChange={(e) => setEnvValue(i, 'value', e.target.value)}
                size="small"
                fullWidth
                slotProps={{ input: { style: { fontFamily: 'monospace' } } }}
              />
              <IconButton
                size="small"
                onClick={() => removeEnvValue(i)}
                disabled={draft.values.length === 1}
                sx={{ flexShrink: 0 }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}

          <Button
            startIcon={<AddIcon />}
            onClick={addEnvValue}
            size="small"
            sx={{ alignSelf: 'flex-start' }}
          >
            Add environment
          </Button>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" disableElevation>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddVariableDialog
