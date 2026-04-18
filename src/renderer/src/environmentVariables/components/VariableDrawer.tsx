import { Box, Divider, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Variable } from '../../../../shared/types/Variable'
import EnvChip from '../../shared/components/EnvChip'
import TypeBadge from '../../shared/components/TypeBadge'

const VariableDrawer = ({
  variable,
  onClose,
  onDelete
}: {
  variable: Variable | null
  onClose: () => void
  onDelete: (variable: Variable) => void
}) => {
  const open = variable !== null

  return (
    <Box
      sx={{
        width: open ? 360 : 0,
        flexShrink: 0,
        overflow: 'hidden',
        transition: 'width 0.25s ease',
        borderLeft: open ? 1 : 0,
        borderColor: 'divider'
      }}
    >
      <Box
        sx={{
          width: 360,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: '100%',
          overflow: 'auto',
          bgcolor: 'background.default'
        }}
      >
        {variable && (
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
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ fontFamily: 'monospace', wordBreak: 'break-all', lineHeight: 1.3, mt: 0.5 }}
                >
                  {variable.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5, mt: -0.5, ml: 1 }}>
                <IconButton size="small" onClick={() => onDelete(variable)} color="error">
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={onClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

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
                      bgcolor: 'background.default',
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
      </Box>
    </Box>
  )
}

export default VariableDrawer
