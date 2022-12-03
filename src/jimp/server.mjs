// noinspection JSUnresolvedVariable

import { MATH, MUSTANG } from '../dataset.mjs'
import { createRequire } from 'node:module'
import { generateText  } from './app.mjs'

import path from 'path'
import fs from 'fs'

const require = createRequire(import.meta.url)
const express = require('express')
const app = express()

const readAsync = fs.promises.readFile

const PORT = process.env.PORT || 3000
const dir = path.resolve()

const error = path.resolve(dir, 'assets/error.png')

/*
* res.set('Content-Type', `image/${format}`)
*/

app.get('/', async (req, res) => {
  const { src, format = 'png', words, size, color, h, v, x, y, mw, mh } = req.query

  const img = {
    mustang: path.resolve(dir, MUSTANG.src),
    math: path.resolve(dir, MATH.src)
  }[src && src.toLowerCase() || 'mustang']

  res.type(`image/${format}`)

  let content

  try {

    content = await generateText(img, format, words, size, color, h, v, x, y, mw, mh)
    res.status(200)

  } catch ({ /* message */ }) {
    content = await readAsync(error)
    res.status(500)
  }

  res.send(content)
})

const server = app.listen(PORT, () => {
  console.log(`Server has been started on port ${server.address().port}...`)
})
