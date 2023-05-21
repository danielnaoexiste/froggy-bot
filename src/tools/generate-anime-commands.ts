import { join } from 'path'
import { writeFileSync } from 'fs'

import { interactions, reactions } from '../util'

import ReactionTemplate from './templates/reaction'
import InteractionTemplate from './templates/interaction'

interactions.map(i =>
  writeFileSync(join(__dirname, `build/${i.name}.ts`), InteractionTemplate(i), {
    flag: 'wx'
  })
)

reactions.map(i =>
  writeFileSync(join(__dirname, `build/${i.name}.ts`), ReactionTemplate(i), {
    flag: 'wx'
  })
)
