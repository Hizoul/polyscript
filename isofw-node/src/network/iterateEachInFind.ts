import { cloneDeep, get, isArray, isObject, isString } from "lodash"
export interface IEachInFindOptions {
  pageSize?: number
}
const iterateEachInFind =
async (collection: any,
       queryObj: any, findMethod: (c: string, q: any) => Promise<any>, iterator: (obj: any) => Promise<any>,
       options?: IEachInFindOptions) => {
  if (!isObject(queryObj)) {
    queryObj = {}
  }
  if (isString(collection)) {
    collection = [collection]
  }
  const pageSize: any = get(options, "pageSize", 5)
  for (const col of collection) {
    let gotMorePages = true
    let currentPage = 0
    let res
    while (gotMorePages) {
      const queryWith = cloneDeep(queryObj)
      queryWith.$limit = pageSize
      queryWith.$skip = pageSize * currentPage
      const findRes = await findMethod(col, queryWith)
      if (isObject(findRes)) {
        if (isArray(findRes.data)) {
          for (const e of findRes.data) {
            e.fromCollection = col
            res = await iterator(e)
          }
        }
        currentPage++
        if (currentPage >= findRes.total / pageSize) {
          gotMorePages = false
        }
      } else {
        gotMorePages = false
      }
    }
    return res
  }
}

export default iterateEachInFind
