import { Client } from 'discord.js'
import { BotEvent } from '../types'
import { color } from '../util'

const event: BotEvent = {
  name: 'ready',
  once: true,
  execute: (client: Client) => {
    console.log(
      color('white', `💪 Logged in as ${color('pink', client.user?.tag)}`)
    )
  }
}

export default event
