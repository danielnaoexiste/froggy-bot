import {
  CacheType,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  User
} from 'discord.js'

export const getReportEmbed = (
  interaction: CommandInteraction<CacheType>,
  target: User,
  reason: string
) => {
  const botName = process.env.BOT_NAME!
  const botIcon = interaction.client.user!.displayAvatarURL()
  const userIcon = target!.displayAvatarURL()

  return new EmbedBuilder()
    .setThumbnail(userIcon)
    .setColor(Colors.Orange)
    .setAuthor({
      name: interaction.client.user!.username,
      url: process.env.BOT_SITE,
      iconURL: botIcon
    })
    .addFields(
      {
        name: 'Target User',
        value: `<@${target.id}>`
      },
      {
        name: 'On Channel',
        value: `<#${interaction.channelId}>`
      },
      {
        name: 'Reason',
        value: `${reason}`,
        inline: true
      },
      {
        name: 'Issued By',
        value: `<@${interaction.user.id}>`
      }
    )
    .setFooter({
      text: botName,
      iconURL: botIcon
    })
    .setTimestamp()
}
