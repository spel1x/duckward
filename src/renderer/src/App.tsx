import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'

type VariableType = 'variable' | 'secret'

interface EnvValue {
  env: string
  value: string
}

interface Variable {
  id: string
  name: string
  description: string
  type: VariableType
  values: EnvValue[]
}

const STATIC_VARIABLES: Variable[] = [
  {
    id: '1',
    name: 'ConnectionStrings__Db',
    description: 'Main database connection string',
    type: 'secret',
    values: [
      { env: 'dev', value: 'Server=localhost;Database=dev' },
      { env: 'qa', value: 'Server=qa-db;Database=qa' },
      { env: 'prod', value: 'Server=prod-db;Database=prod' },
    ],
  },
  {
    id: '2',
    name: 'FUNCTIONS_WORKER_RUNTIME',
    description: 'Azure Functions runtime language',
    type: 'variable',
    values: [
      { env: 'dev', value: 'dotnet' },
      { env: 'qa', value: 'dotnet' },
      { env: 'prod', value: 'dotnet' },
    ],
  },
  {
    id: '3',
    name: 'AzureWebJobsStorage',
    description: 'Storage account connection',
    type: 'secret',
    values: [
      { env: 'dev', value: 'UseDevelopmentStorage=true' },
      { env: 'qa', value: 'DefaultEndpoints=https;AccountName=qa' },
    ],
  },
  {
    id: '4',
    name: 'APPINSIGHTS_KEY',
    description: 'Application Insights instrumentation key',
    type: 'secret',
    values: [
      { env: 'dev', value: 'dev-key-abc123' },
      { env: 'qa', value: 'qa-key-def456' },
      { env: 'prod', value: 'prod-key-ghi789' },
    ],
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
      { env: 'prod', value: 'sb://prod-bus.servicebus.windows.net' },
    ],
  },
]

const ENV_COLORS: Record<string, string> = {
  dev:     'bg-emerald-900/60 text-emerald-300 ring-1 ring-emerald-700/50',
  qa:      'bg-amber-900/60 text-amber-300 ring-1 ring-amber-700/50',
  staging: 'bg-violet-900/60 text-violet-300 ring-1 ring-violet-700/50',
  prod:    'bg-rose-900/60 text-rose-300 ring-1 ring-rose-700/50',
}

const DEFAULT_ENV_COLOR = 'bg-zinc-700/60 text-zinc-300 ring-1 ring-zinc-600/50'

function EnvTag({ env }: { env: string }): React.JSX.Element {
  return (
    <span className={cn('inline-flex items-center rounded px-2 py-0.5 text-xs font-medium', ENV_COLORS[env] ?? DEFAULT_ENV_COLOR)}>
      {env}
    </span>
  )
}

function TypeBadge({ type }: { type: VariableType }): React.JSX.Element {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
      type === 'secret' ? 'bg-rose-900/50 text-rose-300' : 'bg-blue-900/50 text-blue-300'
    )}>
      {type === 'secret' ? '🔒 secret' : '# variable'}
    </span>
  )
}

function App(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-1 text-2xl font-bold text-zinc-100">Environment Variables</h1>
        <p className="mb-6 text-sm text-zinc-400">Manage variables across environments.</p>

        <div className="rounded-lg border border-zinc-700/50 bg-zinc-800/50">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Environments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {STATIC_VARIABLES.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-mono text-xs font-medium text-zinc-100">{v.name}</TableCell>
                  <TableCell className="text-zinc-400 text-sm">{v.description}</TableCell>
                  <TableCell><TypeBadge type={v.type} /></TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5">
                      {v.type === 'secret'
                        ? v.values.map((ev) => <EnvTag key={ev.env} env={ev.env} />)
                        : v.values.map((ev) => (
                            <span key={ev.env} className="flex items-center gap-1">
                              <EnvTag env={ev.env} />
                              <span className="font-mono text-xs text-zinc-400">{ev.value}</span>
                            </span>
                          ))
                      }
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default App
