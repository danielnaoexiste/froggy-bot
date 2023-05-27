import { SlashCommandBuilder } from 'discord.js'

import { SlashCommand } from '../../types'
import {
  getBotInfoEmbed,
  getUserInfoEmbed,
  getServerInfoEmbed
} from '../../embeds/info'
import { Categories } from '../../util'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Displays information about [user/bot/server].')
    .addStringOption(option =>
      option
        .setName('category')
        .setDescription('info category')
        .setRequired(true)
        .addChoices(
          { name: 'bot', value: 'bot_info' },
          { name: 'user', value: 'user_info' },
          { name: 'server', value: 'server_info' }
        )
    )
    .addUserOption(option =>
      option.setName('target').setDescription('The user').setRequired(false)
    ),

  execute: async interaction => {
    const category = interaction.options.get('category')!.value

    switch (category) {
      case 'bot_info': {
        const botInfoEmbed = await getBotInfoEmbed(interaction)
        await interaction.reply({ embeds: [botInfoEmbed] })
        break
      }
      case 'user_info': {
        const userInfoEmbed = await getUserInfoEmbed(interaction)
        await interaction.reply({ embeds: [userInfoEmbed] })
        break
      }
      case 'server_info': {
        const serverInfoEmbed = await getServerInfoEmbed(interaction)
        await interaction.reply({ embeds: [serverInfoEmbed] })
        break
      }
    }
  },
  cooldown: 10,
  category: Categories.INFO
}

export default command
