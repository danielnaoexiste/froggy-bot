import { join } from 'path'
import { readdirSync } from 'fs'
import { Client } from 'discord.js'

import { color } from '../util'
import { BotEvent } from '../types'

module.exports = (client: Client) => {
  let eventsDir = join(__dirname, '../events')

  readdirSync(eventsDir).forEach(file => {
    if (!file.endsWith('.js')) return

    let event: BotEvent = require(`${eventsDir}/${file}`).default

    event.once
      ? client.once(event.name, (...args) => event.execute(...args))
      : client.on(event.name, (...args) => event.execute(...args))

    console.log(
      color(
        'white',
        `🌠 Successfully loaded event ${color('blue', event.name)}`
      )
    )
  })
}
