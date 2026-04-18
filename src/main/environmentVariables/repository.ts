import { Variable } from '../../shared/types/Variable'
import { app } from 'electron'
import path from 'path'
import fs from 'fs'

const filePath = path.join(app.getPath('userData'), 'variables.json')

export function getAll(): Variable[] {
  const data = fs.readFileSync(filePath, 'utf8')
  const variables: Variable[] = JSON.parse(data)
  return variables
}

export function createVariable(variable: Variable): void {
  console.log('Creating variable:', variable)
}
