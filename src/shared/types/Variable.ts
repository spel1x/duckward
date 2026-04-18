export type Environment = 'dev' | 'qa' | 'uat' | 'prod'

export interface EnvValue {
  env: Environment
  value: string
}

export interface Variable {
  id: string
  name: string
  description: string
  type: 'variable' | 'secret'
  values: EnvValue[]
}

export type CreateVariable = Omit<Variable, 'id'>
