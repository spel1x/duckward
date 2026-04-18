import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { CreateVariable, Environment, EnvValue } from '../../../../shared/types/Variable'

const ENV_OPTIONS: Environment[] = ['dev', 'qa', 'uat', 'prod']

const EMPTY_DRAFT: CreateVariable = {
  name: '',
  description: '',
  type: 'variable',
  values: [{ env: 'dev', value: '' }]
}

const AddVariableDialog = ({
  open,
  onClose,
  onSave
}: {
  open: boolean
  onClose: () => void
  onSave: (draft: CreateVariable) => void
}) => {
  const [draft, setDraft] = useState<CreateVariable>(EMPTY_DRAFT)

  function handleClose(): void {
    setDraft(EMPTY_DRAFT)
    onClose()
  }

  function handleSave(): void {
    onSave(draft)
    handleClose()
  }

  function setField<K extends keyof CreateVariable>(key: K, value: CreateVariable[K]): void {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  function setEnvValue(index: number, field: keyof EnvValue, value: string): void {
    setDraft((prev) => {
      const values = [...prev.values]
      values[index] = { ...values[index], [field]: value }
      return { ...prev, values }
    })
  }

  function addEnvValue(): void {
    setDraft((prev) => ({ ...prev, values: [...prev.values, { env: 'dev', value: '' }] }))
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
              <FormControl size="small" sx={{ width: 140 }}>
                <InputLabel>Environment</InputLabel>
                <Select
                  label="Environment"
                  value={ev.env}
                  onChange={(e) => setEnvValue(i, 'env', e.target.value)}
                >
                  {ENV_OPTIONS.map((env) => (
                    <MenuItem key={env} value={env}>
                      {env}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
        <Button onClick={handleSave} variant="contained" disableElevation>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddVariableDialog
