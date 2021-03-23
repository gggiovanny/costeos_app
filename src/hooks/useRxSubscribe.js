import * as Database from '../providers/RxDB/Database'
import { useEffect } from 'react'

export function useRxSubscribe(schema, findQuery, suscribeCallback, subs) {
  useEffect(() => {
    ;(async () => {
      const db = await Database.get()
      const sub = db[schema].find(findQuery).$.subscribe((data) => {
        if (!data) return
        suscribeCallback(data)
      })
      subs.push(sub)
    })()
    return () => {
      subs.forEach((sub) => sub.unsubscribe())
    }
  }, [])
}
