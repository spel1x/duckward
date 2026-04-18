import { CreateVariable, Variable } from '../../shared/types/Variable'
import { getAll as getAllFromRepo } from './repository'
import { createVariable as createVariableInRepo } from './repository'

export function getAll(): Variable[] {
  return getAllFromRepo()
}

export function createVariable(variable: CreateVariable): void {
  const createdVariable: Variable = {
    ...variable,
    id: crypto.randomUUID()
  }
  createVariableInRepo(createdVariable)
}
