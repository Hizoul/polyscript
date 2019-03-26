
declare module "body-parser" {
    const bodyParser: any
    export = bodyParser
}

declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}