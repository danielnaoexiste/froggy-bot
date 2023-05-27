import {
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel
} from 'discord.js'

import dayjs from 'dayjs'
import { SlashCommand } from '../../types'
import { getPenaltyEmbed } from '../../embeds/adm'

import GuildPenaltyModel from '../../schemas/GuildPenalty'
import { Categories } from '../../util'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a member from the server.')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('The user to kick.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for kicking this user.')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers
    ),

  execute: async (interaction, client) => {
    const type = 'kick'
    const target = interaction.options.getUser('target')
    const member = await interaction.guild!.members.fetch(target!.id)
    const reason = interaction.options.get('reason')!.value as string

    if (!member)
      return interaction.reply({
        content: 'Unable to find user',
        ephemeral: true
      })

    if (!member.kickable || target!.id === interaction.client!.user.id)
      return interaction.reply({
        content: "I'm unable to kick this member.",
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
    member.kick(reason)

    if (channelId) {
      const penaltiesChannel = (await interaction.guild!.channels.fetch(
        channelId
      )) as TextChannel

      const reportEmbed = getPenaltyEmbed(interaction, target!, type, reason)

      await penaltiesChannel!.send({ embeds: [reportEmbed] })
    }

    return interaction.reply({
      content: `<@${target!.id}> kicked successfully!`,
      ephemeral: true
    })
  },
  cooldown: 10,
  category: Categories.ADM
}

export default command
