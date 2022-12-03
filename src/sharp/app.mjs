// noinspection JSValidateJSDoc

import { sharp } from './loader.mjs'

import path from 'path'
import fs from 'fs'

const error = path.resolve(path.resolve(), 'assets/error.png')

/**
* @param {String} path
* @param {String} format
* @param {Number} width
* @param {Number} height
* @return {NodeJS.ReadableStream}
*/
export function resize(path, format, width, height)
{
  const rs = fs.createReadStream(path)

  let transform = /** @type {NodeJS.WritableStream|Sharp} */sharp()

  try {

    if (format) {
      transform = transform.toFormat(format, {})
    }
    if (width || height) {
      transform = transform.resize(width, height)
    }

  } catch ({ /* message */ }) {
    return /** @type NodeJS.ReadableStream */fs.createReadStream(error)
  }

  return /** @type NodeJS.ReadableStream */rs.pipe(transform)
}
