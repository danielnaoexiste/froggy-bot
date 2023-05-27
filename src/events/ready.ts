import { Client, Events } from 'discord.js'
import { BotEvent } from '../types'
import { color } from '../util'

const event: BotEvent = {
  name: Events.ClientReady,
  once: true,

  execute: (client: Client) => {
    console.log(
      color('white', `💪 Logged in as ${color('pink', client.user?.tag)}`)
    )
  }
}

export default event
