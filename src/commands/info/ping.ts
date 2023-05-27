import { SlashCommandBuilder, EmbedBuilder, Colors } from 'discord.js'

import { SlashCommand } from '../../types'
import { Categories } from '../../util'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Shows the bot's ping"),

  execute: async interaction => {
    const delay = Math.abs(Date.now() - interaction.createdTimestamp)

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: interaction.client.user!.username })
          .setDescription(
            `🏓 Pong! API: \`${interaction.client.ws.ping}ms\` | Delay: \`${delay}ms\``
          )
          .setColor(Colors.Green)
      ]
    })
  },
  cooldown: 10,
  category: Categories.INFO
}

export default command
