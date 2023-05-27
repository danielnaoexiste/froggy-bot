import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'

import { IGuildConfig, SlashCommand } from '../../types'
import GuildConfigModel from '../../schemas/GuildConfig'
import { Categories } from '../../util'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('setchannel')
    .setDescription('Sets moderation channels.')
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('Select channel type')
        .setRequired(true)
        .addChoices(
          { name: 'welcome', value: 'welcome' },
          { name: 'reports', value: 'reports' },
          { name: 'penalties', value: 'penalties' }
        )
    )
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('Select target channel')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  execute: async (interaction, client) => {
    const type = interaction.options.get('type')!.value
    const channel =
      (interaction.options.get('channel')?.value as string) ??
      interaction.channelId

    let channelField

    switch (type) {
      case 'reports':
        channelField = { reports_channel_id: channel }
        break
      case 'penalties':
        channelField = { penalties_channel_id: channel }
        break
      case 'welcome':
        channelField = { welcome_channel_id: channel }
        break
    }

    const newConfig = (await GuildConfigModel.findOneAndUpdate(
      {
        guild_id: interaction.guild!.id
      },
      channelField,
      { new: true }
    )) as IGuildConfig

    client?.configs.set(interaction.guild!.id, newConfig)

    return interaction.reply({
      content: `<#${channel}> set as ${type} channel successfully!`,
      ephemeral: true
    })
  },
  cooldown: 10,
  category: Categories.CONFIG
}

export default command
