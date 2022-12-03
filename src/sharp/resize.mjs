import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require('sharp')

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

  sharp(IMG.src)
    .resize(IMG.width,IMG.height)
    .toFile(IMG.output('sharp'))
    .then(info => {
      console.log({
        status: 'done',
        ...info
      })
    })
    .catch(error => {
      console.log({
        status: 'failure',
        ...error
      })
    })
}
