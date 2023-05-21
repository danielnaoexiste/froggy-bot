import { CacheType, Colors, CommandInteraction, EmbedBuilder } from 'discord.js'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const getUserInfoEmbed = async (
  interaction: CommandInteraction<CacheType>
) => {
  const user = interaction.options.getUser('target') || interaction.user
  const botName = process.env.BOT_NAME!

  const botIcon = interaction.client.user!.displayAvatarURL()
  const userIcon = user.displayAvatarURL()

  const member = await interaction.guild!.members.fetch(user.id)
  const roleList = Array.from(member.roles.cache.values())

  return new EmbedBuilder()
    .setThumbnail(userIcon)
    .setColor(Colors.LuminousVividPink)
    .setAuthor({
      name: user.username,
      url: process.env.BOT_SITE,
      iconURL: userIcon
    })
    .addFields(
      {
        name: 'ID',
        value: `${user.id}`
      },
      {
        name: 'Discord Tag',
        value: `${user.tag}`
      },
      {
        name: 'Nickname',
        value: member.nickname || '---'
      },
      {
        name: 'Status',
        value: member.presence?.status || '---'
      },
      {
        name: 'Member Since',
        value: `${dayjs(member.joinedAt).fromNow()} [\`${dayjs(
          member.joinedAt
        ).format('MMMM D, YYYY')}\`]`
      },
      {
        name: 'Discord User Since',
        value: `${dayjs(user.createdAt).fromNow()} [\`${dayjs(
          user.createdAt
        ).format('MMMM D, YYYY')}\`]`
      },
      {
        name: 'Roles',
        value: `${
          roleList.filter(role => role.name !== '@everyone').join(', ') || '---'
        }`
      }
    )
    .setFooter({
      text: botName,
      iconURL: botIcon
    })
    .setTimestamp()
}
