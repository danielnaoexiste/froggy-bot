import ms from 'ms'
import { SlashCommandBuilder } from 'discord.js'

import { SlashCommand } from '../../types'
import { getPollQuestionEmbed, getPollResultEmbed } from '../../embeds/adm'
import { Categories } from '../../util'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Generates a poll.')
    .addStringOption(option =>
      option
        .setName('question')
        .setDescription('Poll question')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('timeout')
        .setDescription('Duration of the poll. Default: 5m')
    ),

  execute: async interaction => {
    const questionOption = interaction.options.get('question')!.value as string
    const timeout =
      (interaction.options.get('timeout')?.value as string) ?? '5m'

    const question = questionOption.endsWith('?')
      ? questionOption
      : `${questionOption}?`

    const questionEmbed = getPollQuestionEmbed(interaction, question, timeout)

    await interaction.reply({ embeds: [questionEmbed] })

    const message = await interaction.fetchReply()
    message.react('✅')
    message.react('❎')

    const filter = (reaction: any) => ['✅', '❎'].includes(reaction.emoji.name)

    await message.awaitReactions({ filter, time: ms(timeout) })

    const positive = message.reactions.cache.get('✅')!.count - 1
    const negative = message.reactions.cache.get('❎')!.count - 1

    const resultEmbed = await getPollResultEmbed(
      interaction,
      question,
      positive,
      negative
    )

    await message.reactions.removeAll()

    return interaction.editReply({ embeds: [resultEmbed] })
  },
  cooldown: 60,
  category: Categories.ADM
}

export default command
