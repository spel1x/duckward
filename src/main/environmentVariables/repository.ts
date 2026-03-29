import { Variable } from '../../shared/types/Variable'

const variables: Variable[] = [
  {
    id: '1',
    name: 'ConnectionStrings__Db',
    description: 'Main database connection string',
    type: 'secret',
    values: [
      { env: 'dev', value: 'Server=localhost;Database=dev' },
      { env: 'qa', value: 'Server=qa-db;Database=qa' },
      { env: 'prod', value: 'Server=prod-db;Database=prod' }
    ]
  },
  {
    id: '2',
    name: 'FUNCTIONS_WORKER_RUNTIME',
    description: 'Azure Functions runtime language',
    type: 'variable',
    values: [
      { env: 'dev', value: 'dotnet' },
      { env: 'qa', value: 'dotnet' },
      { env: 'prod', value: 'dotnet' }
    ]
  },
  {
    id: '3',
    name: 'AzureWebJobsStorage',
    description: 'Storage account connection',
    type: 'secret',
    values: [
      { env: 'dev', value: 'UseDevelopmentStorage=true' },
      { env: 'qa', value: 'DefaultEndpoints=https;AccountName=qa' }
    ]
  },
  {
    id: '4',
    name: 'APPINSIGHTS_KEY',
    description: 'Application Insights instrumentation key',
    type: 'secret',
    values: [
      { env: 'dev', value: 'dev-key-abc123' },
      { env: 'qa', value: 'qa-key-def456' },
      { env: 'prod', value: 'prod-key-ghi789' }
    ]
  },
  {
    id: '5',
    name: 'ServiceBus__Namespace',
    description: 'Service bus namespace URL',
    type: 'variable',
    values: [
      { env: 'dev', value: 'sb://dev-bus.servicebus.windows.net' },
      { env: 'staging', value: 'sb://staging-bus.servicebus.windows.net' },
      { env: 'qa', value: 'sb://qa-bus.servicebus.windows.net' },
      { env: 'prod', value: 'sb://prod-bus.servicebus.windows.net' }
    ]
  }
]

export function getAll(): Variable[] {
  return variables
}
