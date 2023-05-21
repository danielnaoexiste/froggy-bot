import { Guild } from 'discord.js'

import { BotEvent } from '../types'

import GuildConfigModel from '../schemas/GuildConfig'

const event: BotEvent = {
  name: 'guildCreate',
  execute: (guild: Guild) => {
    let newGuild = new GuildConfigModel({
      guild_id: guild.id
    })
    newGuild.save()
  }
}

export default event
