import { useState } from 'react'
import {
  Box,
  Button,
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
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import { Variable, EnvValue, Environment } from '../../../../shared/types/Variable'
import EnvChip from '../../shared/components/EnvChip'
import TypeBadge from '../../shared/components/TypeBadge'

const ENV_OPTIONS: Environment[] = ['dev', 'qa', 'uat', 'prod']

const VariableDrawer = ({
  variable,
  onClose,
  onDelete,
  onSave
}: {
  variable: Variable | null
  onClose: () => void
  onDelete: (variable: Variable) => void
  onSave: (variable: Variable) => void
}) => {
  const open = variable !== null
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<Variable | null>(variable ? { ...variable } : null)

  const setField = <K extends keyof Variable>(key: K, value: Variable[K]) => {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  const setEnvValue = (index: number, field: keyof EnvValue, value: string) => {
    setDraft((prev) => {
      if (!prev) return prev
      const values = [...prev.values]
      values[index] = { ...values[index], [field]: value }
      return { ...prev, values }
    })
  }

  const addValue = () => {
    setDraft((prev) =>
      prev ? { ...prev, values: [...prev.values, { env: 'dev', value: '' }] } : prev
    )
  }

  const removeValue = (index: number) => {
    setDraft((prev) =>
      prev ? { ...prev, values: prev.values.filter((_, i) => i !== index) } : prev
    )
  }

  const handleSave = () => {
    if (!draft) return
    onSave(draft)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setDraft(variable ? { ...variable } : null)
    setIsEditing(false)
  }

  return (
    <Box
      sx={{
        width: open ? 360 : 0,
        flexShrink: 0,
        overflow: 'hidden',
        transition: 'width 0.25s ease',
        borderLeft: open ? 1 : 0,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          width: 360,
          flex: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflow: 'auto',
          bgcolor: 'background.default'
        }}
      >
        {variable && draft && (
          <>
            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}
                >
                  Variable
                </Typography>
                {!isEditing && (
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      fontFamily: 'monospace',
                      wordBreak: 'break-all',
                      lineHeight: 1.3,
                      mt: 0.5
                    }}
                  >
                    {variable.name}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5, mt: -0.5, ml: 1 }}>
                {!isEditing && (
                  <IconButton size="small" onClick={() => setIsEditing(true)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
                <IconButton size="small" onClick={() => onDelete(variable)} color="error">
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={onClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {isEditing ? (
              <>
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
                    onChange={(e) => setField('type', e.target.value as Variable['type'])}
                    sx={{ mt: 0.5 }}
                  >
                    <FormControlLabel
                      value="variable"
                      control={<Radio size="small" />}
                      label="Config"
                    />
                    <FormControlLabel
                      value="secret"
                      control={<Radio size="small" />}
                      label="Secret"
                    />
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
                      <FormControl size="small" sx={{ width: 110 }}>
                        <InputLabel>Env</InputLabel>
                        <Select
                          label="Env"
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
                        onClick={() => removeValue(i)}
                        disabled={draft.values.length === 1}
                        sx={{ flexShrink: 0 }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={addValue}
                    size="small"
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Add environment
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TypeBadge type={variable.type} />
                  {variable.description && (
                    <Typography variant="body2" color="text.secondary">
                      {variable.description}
                    </Typography>
                  )}
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
                  {variable.values.map((ev) => (
                    <Box key={ev.env} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <EnvChip env={ev.env} />
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'monospace',
                          bgcolor: 'background.paper',
                          px: 1.5,
                          py: 1,
                          borderRadius: 1,
                          wordBreak: 'break-all',
                          color: 'text.primary'
                        }}
                      >
                        {ev.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </>
        )}
      </Box>

      {isEditing && (
        <Box
          sx={{
            width: 360,
            p: 2,
            display: 'flex',
            gap: 1,
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.default'
          }}
        >
          <Button onClick={handleCancel} color="inherit" fullWidth>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" disableElevation fullWidth>
            Save
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default VariableDrawer
