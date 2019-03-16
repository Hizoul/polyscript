let toExport: any
const c: any = global
if (c.performance != null && c.performance.now != null) {
  toExport = () => c.performance.now()
} else if (Date.now) {
  const loadTime1 = Date.now()
  toExport = () => {
    return Date.now() - loadTime1
  }
} else {
  const loadTime2 = new Date().getTime()
  toExport = () => {
    return new Date().getTime() - loadTime2
  }
}

export default toExport
