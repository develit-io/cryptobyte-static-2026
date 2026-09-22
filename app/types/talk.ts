import type { Person } from './person'

export type TalkDifficulty = 1 | 2 | 3 | null

// refactored talk type
export type Talk = {
  id: number
  status: string
  format: 'intro' | 'presentation' | 'workshop' | 'panel' | 'side'
  stage: number
  start: Date
  length: number
  difficulty: TalkDifficulty
  name: string
  description: string
  moderator: null | Person
  persons: Person[]
}
