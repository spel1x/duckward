import { ElectronAPI } from '@electron-toolkit/preload'
import { Variable, CreateVariable } from '../shared/types/Variable'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getVariables: () => Promise<Variable[]>
      createVariable: (variable: CreateVariable) => Promise<void>
      deleteVariable: (id: string) => Promise<void>
      updateVariable: (variable: Variable) => Promise<void>
    }
  }
}
