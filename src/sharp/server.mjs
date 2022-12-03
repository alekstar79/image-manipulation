import { MATH, MUSTANG } from '../dataset.mjs'
import { app } from './loader.mjs'
import { resize } from './app.mjs'

import path from 'path'

const toInt = arg => parseInt(arg)
const PORT = process.env.PORT || 3000
const dir = path.resolve()

app.get('/', (req, res) => {
  let { src, format = 'png', height, width } = req.query

  const img = {
    mustang: path.resolve(dir, MUSTANG.src),
    math: path.resolve(dir, MATH.src)
  }[src && src.toLowerCase() || 'mustang']

  switch (true) {
    case isNaN(height) && isNaN(width):
      height = width = 0
      break
    case isNaN(height) && !isNaN(width):
      height = width = toInt(width)
      break
    case isNaN(width) && !isNaN(height):
      width = height = toInt(height)
      break
    default:
      height = toInt(height)
      width = toInt(width)
  }

  res.type(`image/${format}`)

  resize(img, format, width, height)
    .pipe(res)
})

const server = app.listen(PORT, () => {
  console.log(`Server has been started on port ${server.address().port}...`)
})
