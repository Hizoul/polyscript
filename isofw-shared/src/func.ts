const add: (x: number, y: number) => number = (x, y) => {
  if (x > 200) {
    return -1
  }
  return x + y
}

export default add
