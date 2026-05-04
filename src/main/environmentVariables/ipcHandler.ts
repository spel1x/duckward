import { ipcMain } from 'electron'
import { createVariable, getVariables, deleteVariable, updateVariable } from './service'

export function register(): void {
  ipcMain.handle('variables:getAll', () => getVariables())
  ipcMain.handle('variables:create', (_, variable) => createVariable(variable))
  ipcMain.handle('variables:delete', (_, id) => deleteVariable(id))
  ipcMain.handle('variables:update', (_, variable) => updateVariable(variable))
}
