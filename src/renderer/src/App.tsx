import { Box } from '@mui/material'
import EnvironmentVariables from './environmentVariables/EnvironmentVariables'

function App(): React.JSX.Element {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <EnvironmentVariables />
    </Box>
  )
}

export default App
