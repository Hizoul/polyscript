
import { cloneDeep, isEqual } from "lodash"

const increaseNumberAt = (arr: number[], index: number) => {
  arr[index] += 1
  if (arr[index] > 15) {
    const newIndex = index + 1
    if (newIndex < arr.length) {
      arr[index] = 0
      for (let i = index; i >= 0; i--) {
        arr[i] = 0
      }
      increaseNumberAt(arr, index + 1)
    }
  }
  return arr
}

const toHex = (num: number) => {
  switch (num) {
    case 0: return "0"
    case 1: return "1"
    case 2: return "2"
    case 3: return "3"
    case 4: return "4"
    case 5: return "5"
    case 6: return "6"
    case 7: return "7"
    case 8: return "8"
    case 9: return "9"
    case 10: return "A"
    case 11: return "B"
    case 12: return "C"
    case 13: return "D"
    case 14: return "E"
    case 15: return "F"
    default: return "0"
  }
}

const getHexDiff = (a: any[], b: any[]) => {
  a = cloneDeep(a)
  b = cloneDeep(b)
  let i = 0
  while (!isEqual(a, b)) {
    i++
    increaseNumberAt(a, 0)
  }
  return i
}

/**
 * 4 bytes go from −32,768 to 32,767
 * @param number
 * @param binaryDigits
 */
const numberToBinary = (number: number, beginAt: number[], endAt: number[], minNum: number, maxNum: number) => {
  const binaryNumbers: number[] = cloneDeep(beginAt)
  const scale = getHexDiff(beginAt, endAt)
  const diffToStart = Math.abs(minNum - number)
  const totalDistance = Math.abs(minNum - maxNum)
  const moveBy = Math.round(diffToStart * (scale / totalDistance))
  console.log(`got ${diffToStart} ${(scale / totalDistance)} Scale ${scale} and moveBy ${moveBy} ${number}`, binaryNumbers)
  for (let i = 0; i < moveBy; i++) {
    increaseNumberAt(binaryNumbers, 0)
  }
  let hexString = ""
  for (let i = binaryNumbers.length - 1; i >= 0; i--) {
    hexString += toHex(binaryNumbers[i])
  }
  console.log("AFTER INCREASE NUMBERBINA IS ", binaryNumbers, hexString)
  return hexString
}

export default numberToBinary
export {
  increaseNumberAt
}
