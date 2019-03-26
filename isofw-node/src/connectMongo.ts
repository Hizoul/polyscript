import { MongoClient } from "mongodb"

let mongoUrl: any = `mongodb://localhost:27017/`

if (global.process != null && process.env.MONGO_URL != null) {
  mongoUrl = process.env.MONGO_URL
}

const connectMongo = async () => {
  const c = await MongoClient.connect(mongoUrl, {useNewUrlParser: true})
  const db = c.db("poly-direct")
  return db
}

export default connectMongo
