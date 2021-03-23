import * as Database from '../providers/RxDB/Database'
import { toast } from 'react-toastify'

export function useRxInsert(schema, insertCallback) {
  return async (data) => {
    const db = await Database.get()
    try {
      await db[schema].insert(data)
    } catch (error) {
      if (error.rxdb)
        toast.error(`Ya existe un registro para '${error.parameters.id}'`)
      else console.error(error)
    }
    insertCallback()
  }
}
