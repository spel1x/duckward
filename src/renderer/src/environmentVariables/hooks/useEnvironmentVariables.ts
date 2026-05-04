import { useState, useEffect } from 'react'
import { Variable, CreateVariable } from '../../../../shared/types/Variable'

interface UseEnvironmentVariablesResult {
  variables: Variable[]
  createVariable: (draft: CreateVariable) => Promise<void>
  deleteVariable: (id: string) => Promise<void>
  updateVariable: (variable: Variable) => Promise<void>
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

  async function updateVariable(updated: Variable): Promise<void> {
    await window.api.updateVariable(updated)
    setVariables((prev) =>
      prev.map((variable) => (variable.id === updated.id ? updated : variable))
    )
  }

  return { variables, createVariable, deleteVariable, updateVariable }
}

export default useEnvironmentVariables
