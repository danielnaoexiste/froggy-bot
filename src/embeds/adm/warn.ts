import { CacheType, Colors, CommandInteraction, EmbedBuilder } from 'discord.js'

export const getWarnEmbed = (
  interaction: CommandInteraction<CacheType>,
  reason: string
) => {
  const serverName = interaction.guild!.name
  const serverIcon = interaction.guild!.iconURL()
  const botIcon = interaction.client.user!.displayAvatarURL()

  return new EmbedBuilder()
    .setColor(Colors.DarkRed)
    .setTitle('You have been warned')
    .setDescription(reason)
    .setFooter({
      text: `You have been moderated in ${serverName}`,
      iconURL: serverIcon ?? botIcon
    })
    .setTimestamp()
}
