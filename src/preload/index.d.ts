import { ElectronAPI } from '@electron-toolkit/preload'
import { Variable } from '../shared/types/Variable'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getVariables: () => Promise<Variable[]>
    }
  }
}
