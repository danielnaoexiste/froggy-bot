import { Client, ActivityType, GatewayIntentBits, Collection } from 'discord.js'
import { config } from 'dotenv'
import { readdirSync } from 'fs'
import { join } from 'path'

import { IGuildConfig, SlashCommand } from './types'

config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions
  ],
  presence: {
    status: 'online',
    activities: [
      {
        name: '/help | New Froggy',
        type: ActivityType.Playing
      }
    ]
  }
})

client.commands = new Collection<string, SlashCommand>()
client.configs = new Collection<string, IGuildConfig>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, './handlers')

readdirSync(handlersDir).forEach(handler => {
  require(`${handlersDir}/${handler}`)(client)
})

client.login(process.env.BOT_TOKEN)
