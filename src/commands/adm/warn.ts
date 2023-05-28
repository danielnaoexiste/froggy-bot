import {
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel
} from 'discord.js'

import { Categories } from '../../util'
import { SlashCommand } from '../../types'
import { getWarnEmbed, getPenaltyEmbed } from '../../embeds/adm'

import dayjs from 'dayjs'
import GuildPenaltyModel from '../../schemas/GuildPenalty'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warns a member from the server.')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('The user to warn.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for warning this user.')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  execute: async (interaction, client) => {
    const type = 'warn'
    const target = interaction.options.getUser('target')
    const reason = interaction.options.get('reason')!.value as string

    if (!target)
      return interaction.reply({
        content: 'Unable to find member.',
        ephemeral: true
      })

    const config = client?.configs.get(interaction.guildId!)
    const channelId = config!['penalties_channel_id']

    const penaltyData = new GuildPenaltyModel({
      type: type,
      guild_id: interaction.guild!.id,
      target_user_id: target!.id,
      author_user_id: interaction.user.id,
      reason: reason,
      issued_on: dayjs().toISOString()
    })

    await penaltyData.save()

    if (channelId) {
      const penaltiesChannel = (await interaction.guild!.channels.fetch(
        channelId
      )) as TextChannel

      const reportEmbed = getPenaltyEmbed(interaction, target!, type, reason)

      await penaltiesChannel!.send({ embeds: [reportEmbed] })
    }

    try {
      const warnEmbed = getWarnEmbed(interaction, reason)
      await target.send({ embeds: [warnEmbed] })

      return interaction.reply({
        content: `<@${target!.id}> warned successfully!`,
        ephemeral: true
      })
    } catch {
      interaction.reply({
        content: `<@${target!.id}> DMs are disabled and could not be warned`,
        ephemeral: true
      })
    }
  },
  cooldown: 10,
  category: Categories.ADM
}

export default command
