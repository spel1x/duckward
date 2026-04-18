import { ipcMain } from 'electron'
import { createVariable, getAll } from './service'

export function register(): void {
  ipcMain.handle('variables:getAll', () => getAll())
  ipcMain.handle('variables:create', (_, variable) => createVariable(variable))
}
