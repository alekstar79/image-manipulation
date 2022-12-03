// noinspection JSUnresolvedFunction

import jimp from 'jimp'

/**
* @param {{ src: String, output: Function, width: Number, height: Number }} settings
* @return void
*/
export function resize(settings)
{
  if (typeof settings !== 'object') {
    return console.log({ status: 'failure' })
  }

  const IMG = {...settings}

  jimp.read(IMG.src)
    .then(img => {
      return img
        .autocrop()
        .resize(IMG.width, IMG.height)
        .write(IMG.output('jimp'))
    })
    .catch(console.log)
}
