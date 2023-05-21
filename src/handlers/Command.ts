import { REST } from '@discordjs/rest'
import { Client, Routes, SlashCommandBuilder } from 'discord.js'

import { globSync } from 'glob'
import { join, resolve } from 'path'

import { color } from '../util'
import { SlashCommand } from '../types'

module.exports = (client: Client) => {
  const commands: SlashCommandBuilder[] = []

  let commandsDir = join(__dirname, '../commands/**/*.js')

  globSync(commandsDir.replace(/\\/g, '/')).forEach(file => {
    let command: SlashCommand = require(resolve(file)).default
    commands.push(command.command)
    client.commands.set(command.command.name, command)
  })

  const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN!)

  rest
    .put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: commands.map(command => command.toJSON())
    })
    .then((data: any) => {
      console.log(
        color(
          'white',
          `🔥 Successfully loaded ${color('pink', data.length)} command(s)`
        )
      )
    })
    .catch(e => {
      console.log(e)
    })
}
