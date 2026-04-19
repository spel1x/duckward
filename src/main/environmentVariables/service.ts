import { CreateVariable, Variable } from '../../shared/types/Variable'
import * as repo from './repository'

export function getVariables(): Variable[] {
  return repo.getVariables()
}

export function createVariable(variable: CreateVariable): void {
  const createdVariable: Variable = {
    ...variable,
    id: crypto.randomUUID()
  }
  repo.createVariable(createdVariable)
}

export function deleteVariable(id: string): void {
  repo.deleteVariable(id)
}
