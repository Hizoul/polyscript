const mulberry32 = (a: number) => {
  return () => {
    let t = a += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

const random = {
  function: mulberry32(Math.floor((Math.random() * Number.MAX_SAFE_INTEGER) + Number.MIN_SAFE_INTEGER)),
  setSeed: (seed: any) => {
    random.function = mulberry32(seed)
  }
}

const randomInRange = (min: number, max: number) => {
  return Math.floor((random.function() * max) + min)
}

const range = (from: number, to: number, step: number = 1) => {
  const rangeArray = []
  for (let i = from; i < to; i += step) {
    rangeArray.push(i)
  }
  return rangeArray
}

const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
const randomString = (length: number) => {
  let text = ""
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(random.function() * possible.length))
  }
  return text
}

export {
  randomInRange, range, random, mulberry32,
  randomString
}
