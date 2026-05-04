import { Box, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const VariablesHeader = ({ onAdd }: { onAdd: () => void }) => (
  <Box>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 0.5
      }}
    >
      <Typography variant="h5" fontWeight={700}>
        Environment Variables
      </Typography>
      <Button variant="contained" disableElevation startIcon={<AddIcon />} onClick={onAdd}>
        Add Variable
      </Button>
    </Box>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      Manage variables across environments.
    </Typography>
  </Box>
)

export default VariablesHeader
