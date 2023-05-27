import { join } from 'path'
import { writeFileSync } from 'fs'

import ReactionTemplate from './templates/reaction'
import InteractionTemplate from './templates/interaction'
import { interactions, reactions } from '../util'

interactions.map(i =>
  writeFileSync(
    join(__dirname, `build/interaction/${i.name}.ts`),
    InteractionTemplate(i),
    {
      flag: 'wx'
    }
  )
)

reactions.map(i =>
  writeFileSync(
    join(__dirname, `build/reaction/${i.name}.ts`),
    ReactionTemplate(i),
    {
      flag: 'wx'
    }
  )
)
