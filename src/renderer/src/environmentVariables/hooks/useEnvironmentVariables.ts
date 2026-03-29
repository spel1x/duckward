import { useState, useEffect } from 'react'
import { Variable } from '../../../../shared/types/Variable'

function useEnvironmentVariables(): Variable[] {
  const [variables, setVariables] = useState<Variable[]>([])

  useEffect(() => {
    window.api.getVariables().then(setVariables)
  }, [])

  return variables
}

export default useEnvironmentVariables
