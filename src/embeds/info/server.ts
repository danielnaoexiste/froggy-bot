import { CacheType, Colors, CommandInteraction, EmbedBuilder } from 'discord.js'

import dayjs from 'dayjs'

export const getServerInfoEmbed = async (
  interaction: CommandInteraction<CacheType>
) => {
  const owner = await interaction.guild!.fetchOwner()
  const roleList = Array.from((await interaction.guild!.roles.fetch()).values())

  const serverIcon = interaction.guild!.iconURL()

  const botName = process.env.BOT_NAME!
  const botIcon = interaction.client.user!.displayAvatarURL()
  const botCount = interaction.guild!.members.cache.filter(
    member => member.user.bot
  ).size

  return new EmbedBuilder()
    .setThumbnail(serverIcon)
    .setColor(Colors.LuminousVividPink)
    .setAuthor({
      name: interaction.guild!.name,
      url: process.env.BOT_SITE,
      iconURL: serverIcon!
    })
    .addFields(
      {
        name: 'Members',
        value: `${interaction.guild!.memberCount}/${botCount} bots`
      },
      {
        name: 'Channels',
        value: `${interaction.guild!.channels.channelCountWithoutThreads}`
      },
      {
        name: 'Owner',
        value: `${owner.user.username}#${owner.user.discriminator}`
      },
      {
        name: 'Created at',
        value: `${dayjs(interaction.guild!.createdAt).format('MMMM D, YYYY')}`
      },
      {
        name: `Roles [${roleList.length}]`,
        value: `${roleList.join(', ')}`
      }
    )
    .setFooter({
      text: botName,
      iconURL: botIcon
    })
    .setTimestamp()
}
