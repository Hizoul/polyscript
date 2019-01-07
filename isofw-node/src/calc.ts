import func from "isofw-shared/src/func"


const newFunc: (x: number, y: number) => number = (x, y) => {
  return func(x, y) + 5
}

export default newFunc