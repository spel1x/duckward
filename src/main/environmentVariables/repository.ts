import { Variable } from '../../shared/types/Variable'
import { app } from 'electron'
import path from 'path'
import fs from 'fs'

const filePath = path.join(app.getPath('userData'), 'variables.json')

export function getVariables(): Variable[] {
  const data = fs.readFileSync(filePath, 'utf8')
  const variables: Variable[] = JSON.parse(data)
  return variables
}

export function createVariable(variable: Variable): void {
  const variables: Variable[] = getVariables()
  variables.push(variable)
  fs.writeFileSync(filePath, JSON.stringify(variables))
}

export function deleteVariable(id: string): void {
  const variables: Variable[] = getVariables()
  const updatedVariables = variables.filter((variable) => variable.id !== id)
  fs.writeFileSync(filePath, JSON.stringify(updatedVariables))
}

export function updateVariable(updated: Variable): void {
  const variables: Variable[] = getVariables()
  const index = variables.findIndex((variable) => variable.id === updated.id)
  if (index === -1) {
    return
  }
  variables[index] = updated
  fs.writeFileSync(filePath, JSON.stringify(variables))
}
