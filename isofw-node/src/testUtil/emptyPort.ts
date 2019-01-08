import * as http from "http"

const emptyPort: () => Promise<number> = () => {
  return new Promise((resolve, reject) => {
    const server = http.createServer()
      .listen(0, () => {
        const address: any = server.address()
        const port = address.port
        server.close(() => {
          resolve(port)
        })
      })
      .on(`error`, reject)
  })
}

export default emptyPort
