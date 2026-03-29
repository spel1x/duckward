export interface EnvValue {
  env: string
  value: string
}

export interface Variable {
  id: string
  name: string
  description: string
  type: 'variable' | 'secret'
  values: EnvValue[]
}
