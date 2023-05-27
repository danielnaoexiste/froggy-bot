import {
  ChannelType,
  PermissionFlagsBits,
  SlashCommandBuilder
} from 'discord.js'

import { SlashCommand } from '../../types'
import { Categories } from '../../util'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Deletes messages from the current channel.')
    .addIntegerOption(option => {
      return option
        .setMaxValue(100)
        .setMinValue(1)
        .setName('messagecount')
        .setDescription('Message amount to be cleared')
        .setRequired(true)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  execute: async interaction => {
    if (interaction.channel?.type === ChannelType.DM) return

    const messageCount = Number(interaction.options.get('messagecount')!.value)

    const messages = await interaction.channel?.messages.fetch({
      limit: messageCount
    })

    const deletedMessages = await interaction.channel?.bulkDelete(
      messages!,
      true
    )

    return deletedMessages?.size === 0
      ? interaction.reply({
          content: 'No messages were deleted.',
          ephemeral: true
        })
      : interaction.reply({
          content: `Successfully deleted ${deletedMessages?.size} message(s)`,
          ephemeral: true
        })
  },
  cooldown: 10,
  category: Categories.ADM
}

export default command
