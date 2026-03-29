import { ElectronAPI } from '@electron-toolkit/preload'

interface Variable {
  id: string
  name: string
  description: string
  isSecret: boolean
  dev: string
  qa: string
  prod: string
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getVariables: () => Promise<Variable[]>
    }
  }
}
