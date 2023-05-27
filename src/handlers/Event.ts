import { Client } from 'discord.js'
import { join } from 'path'
import { readdirSync } from 'fs'

import { color } from '../util'
import { BotEvent } from '../types'

module.exports = (client: Client) => {
  const eventsDir = join(__dirname, '../events')

  readdirSync(eventsDir).forEach(file => {
    if (!file.endsWith('.js')) return

    const event: BotEvent = require(`${eventsDir}/${file}`).default

    event.once
      ? client.once(event.name, (...args) => event.execute(client, ...args))
      : client.on(event.name, (...args) => event.execute(client, ...args))

    console.log(
      color(
        'white',
        `🌠 Successfully loaded event ${color('blue', event.name)}`
      )
    )
  })
}
