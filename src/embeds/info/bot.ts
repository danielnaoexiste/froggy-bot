import { CacheType, Colors, CommandInteraction, EmbedBuilder } from 'discord.js'

import dayjs from 'dayjs'

export const getBotInfoEmbed = (interaction: CommandInteraction<CacheType>) => {
  const botIcon = interaction.client.user!.displayAvatarURL()
  const botName = process.env.BOT_NAME!

  return new EmbedBuilder()
    .setThumbnail(botIcon)
    .setColor(Colors.LuminousVividPink)
    .setAuthor({
      name: interaction.client.user!.username,
      url: process.env.BOT_SITE,
      iconURL: botIcon
    })
    .addFields(
      {
        name: 'Created at',
        value: dayjs(interaction.client.user!.createdAt).format('MMMM D, YYYY')
      },
      {
        name: 'Ping',
        value: `${interaction.client.ws.ping}ms`
      },
      {
        name: 'Currently On',
        value: `${interaction.client.guilds.cache.size} Servers with ${interaction.client.users.cache.size} users!`
      },
      {
        name: 'Created by',
        value: botName
      }
    )
    .setFooter({
      text: botName,
      iconURL: botIcon
    })
    .setTimestamp()
}
