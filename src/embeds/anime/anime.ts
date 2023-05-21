import { CacheType, Colors, CommandInteraction, EmbedBuilder } from 'discord.js'

export const getAnimeEmbed = async (
  interaction: CommandInteraction<CacheType>,
  description: string,
  image: string
) => {
  const botIcon = interaction.client.user!.displayAvatarURL()

  return new EmbedBuilder()
    .setColor(Colors.LuminousVividPink)
    .setDescription(`**${description}**`)
    .setImage(image)
    .setFooter({
      text: 'Powered by otakugifs.xyz',
      iconURL: botIcon
    })
    .setTimestamp()
}
