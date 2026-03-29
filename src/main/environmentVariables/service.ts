import { Variable } from '../../shared/types/Variable'
import { getAll as getAllFromRepo } from './repository'

export function getAll(): Variable[] {
  return getAllFromRepo()
}
