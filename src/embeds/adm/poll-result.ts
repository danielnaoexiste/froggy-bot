import { CacheType, Colors, CommandInteraction, EmbedBuilder } from 'discord.js'

export const getPollResultEmbed = (
  interaction: CommandInteraction<CacheType>,
  question: string,
  positive: number,
  negative: number
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
        name: '✅',
        value: `${positive} votes!`,
        inline: true
      },
      {
        name: '❎',
        value: `${negative} votes!`,
        inline: true
      }
    )
    .setFooter({
      text: botName,
      iconURL: botIcon
    })
    .setTimestamp()
}
