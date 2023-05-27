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
    .setName('ban')
    .setDescription('Bans a member from the server.')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('The user to ban.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for banning this user.')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  execute: async (interaction, client) => {
    const type = 'ban'
    const target = interaction.options.getUser('target')
    const member = await interaction.guild!.members.fetch(target!.id)
    const reason = interaction.options.get('reason')!.value as string

    if (!member)
      return interaction.reply({
        content: 'Unable to find user',
        ephemeral: true
      })

    if (!member.bannable || target!.id === interaction.client!.user.id)
      return interaction.reply({
        content: "I'm unable to ban this member.",
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
    member.ban({ reason })

    if (channelId) {
      const penaltiesChannel = (await interaction.guild!.channels.fetch(
        channelId
      )) as TextChannel

      const reportEmbed = getPenaltyEmbed(interaction, target!, type, reason)

      await penaltiesChannel!.send({ embeds: [reportEmbed] })
    }

    return interaction.reply({
      content: `<@${target!.id}> banned successfully!`,
      ephemeral: true
    })
  },
  cooldown: 10,
  category: Categories.ADM
}

export default command
