import { ipcMain } from 'electron'
import { getAll } from './service'

export function register(): void {
  ipcMain.handle('variables:getAll', () => getAll())
}
