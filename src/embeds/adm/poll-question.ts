import { CacheType, Colors, CommandInteraction, EmbedBuilder } from 'discord.js'

export const getPollQuestionEmbed = (
  interaction: CommandInteraction<CacheType>,
  question: string,
  timeout: string
) => {
  const authorName = interaction.user.username
  const authorIcon = interaction.user.displayAvatarURL()

  const botName = process.env.BOT_NAME!
  const botIcon = interaction.client.user!.displayAvatarURL()

  return new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({
      name: authorName,
      iconURL: authorIcon
    })
    .addFields(
      {
        name: 'Question:',
        value: `**${question}**`
      },
      {
        name: '\u200b',
        value: `React to Vote.\n*Poll will run for ${timeout}*`
      }
    )
    .setFooter({
      text: botName,
      iconURL: botIcon
    })
    .setTimestamp()
}
