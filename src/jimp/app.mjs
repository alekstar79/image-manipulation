// noinspection JSUnresolvedFunction,JSUnresolvedVariable

import { TYPE } from '../dataset.mjs'
import jimp from 'jimp'

export async function generateText(
  img,
  format,
  text = 'COMMUNITY',
  size = '64',
  color = 'BLACK',
  HA = 'LEFT',
  VA = 'MIDDLE',
  X = 0,
  Y = 0,
  mW = Infinity,
  mH = Infinity
) {

  const font = await jimp.loadFont(jimp[`FONT_SANS_${size}_${color.toUpperCase()}`])
  const image = await jimp.read(img)

  image.print(
    font,
    +X,
    +Y,
    {
      text,
      alignmentX: jimp[`HORIZONTAL_ALIGN_${HA}`],
      alignmentY: jimp[`VERTICAL_ALIGN_${VA}`]
    },
    +mW,
    +mH
  )

  return image.getBufferAsync(jimp[`MIME_${TYPE[format || 'png']}`])
}
