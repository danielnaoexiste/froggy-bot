import dayjs from 'dayjs'
import { SlashCommandBuilder, TextChannel } from 'discord.js'

import { SlashCommand } from '../../types'
import { getReportEmbed } from '../../embeds/adm'

import GuildReportModel from '../../schemas/GuildReport'
import { Categories } from '../../util'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('report')
    .setDescription('Reports a server member.')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('The user to report')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for reporting this user.')
        .setRequired(true)
    ),

  execute: async (interaction, client) => {
    const target = interaction.options.getUser('target')
    const reason = interaction.options.get('reason')!.value as string

    if (!target)
      return interaction.reply({
        content: 'Unable to find user',
        ephemeral: true
      })

    const config = client?.configs.get(interaction.guildId!)
    const channelId = config!['reports_channel_id']

    if (!channelId)
      return interaction.reply({
        content: 'No report channel configured.',
        ephemeral: true
      })

    const reportData = new GuildReportModel({
      guild_id: interaction.guild!.id,
      target_user_id: target!.id,
      author_user_id: interaction.user.id,
      reason: reason,
      issued_on: dayjs().toISOString()
    })

    await reportData.save()

    if (channelId) {
      const reportsChannel = (await interaction.guild!.channels.fetch(
        channelId
      )) as TextChannel

      const reportEmbed = getReportEmbed(interaction, target, reason)

      const message = await reportsChannel!.send({ embeds: [reportEmbed] })
      message.react('✅')
      message.react('❎')
    }

    return interaction.reply({
      content: `<@${target!.id}> reported successfully!`,
      ephemeral: true
    })
  },
  cooldown: 10,
  category: Categories.ADM
}

export default command
