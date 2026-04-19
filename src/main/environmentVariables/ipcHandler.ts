import { ipcMain } from 'electron'
import { createVariable, getVariables, deleteVariable } from './service'

export function register(): void {
  ipcMain.handle('variables:getAll', () => getVariables())
  ipcMain.handle('variables:create', (_, variable) => createVariable(variable))
  ipcMain.handle('variables:delete', (_, id) => deleteVariable(id))
}
