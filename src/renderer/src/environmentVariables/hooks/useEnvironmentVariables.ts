import { useState, useEffect } from 'react'
import { Variable, CreateVariable } from '../../../../shared/types/Variable'

interface UseEnvironmentVariablesResult {
  variables: Variable[]
  createVariable: (draft: CreateVariable) => Promise<void>
  deleteVariable: (id: string) => Promise<void>
}

function useEnvironmentVariables(): UseEnvironmentVariablesResult {
  const [variables, setVariables] = useState<Variable[]>([])

  useEffect(() => {
    window.api.getVariables().then(setVariables)
  }, [])

  async function createVariable(draft: CreateVariable): Promise<void> {
    await window.api.createVariable(draft)
    setVariables((prev) => [...prev, { ...draft, id: crypto.randomUUID() }])
  }

  async function deleteVariable(id: string): Promise<void> {
    await window.api.deleteVariable(id)
    setVariables((prev) => prev.filter((variable) => variable.id !== id))
  }

  return { variables, createVariable, deleteVariable }
}

export default useEnvironmentVariables
