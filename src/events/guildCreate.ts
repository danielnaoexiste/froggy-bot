import { Client, Events, Guild } from 'discord.js'

import { BotEvent } from '../types'

import GuildConfigModel from '../schemas/GuildConfig'
import { color } from '../util'

const event: BotEvent = {
  name: Events.GuildCreate,

  execute: async (client: Client, guild: Guild) => {
    const config = await GuildConfigModel.findOne({ guild_id: guild.id })

    if (config) {
      client.configs.set(guild.id, config)
      return console.log(
        color('white', `💪 Guild configuration ${color('pink', 'found!')}`)
      )
    }

    const newGuild = new GuildConfigModel({
      guild_id: guild.id
    })

    await newGuild.save()

    return console.log(
      color('white', `💪 Guild configuration ${color('pink', 'created!')}`)
    )
  }
}

export default event
