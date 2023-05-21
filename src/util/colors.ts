import chalk from 'chalk'

type colorType = 'pink' | 'white' | 'blue'

const themeColors = {
  pink: '#F5A9B8',
  white: '#FFFFFF',
  blue: '#5BCEFA'
}

export const getThemeColor = (color: colorType) =>
  Number(`0x${themeColors[color].substring(1)}`)

export const color = (color: colorType, message: any) => {
  return chalk.hex(themeColors[color])(message)
}
