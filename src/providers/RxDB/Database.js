import { createRxDatabase, addRxPlugin } from 'rxdb'
import { collections } from './Schemas'
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'
import { RxDBReplicationPlugin } from 'rxdb/plugins/replication'
import { RxDBNoValidatePlugin } from 'rxdb/plugins/no-validate'
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from 'react-use-storage'

addRxPlugin(require('pouchdb-adapter-idb'))
addRxPlugin(require('pouchdb-adapter-http')) // enable syncing over http
addRxPlugin(RxDBLeaderElectionPlugin)
addRxPlugin(RxDBReplicationPlugin)
addRxPlugin(RxDBNoValidatePlugin)

let dbPromise = null

const _create = async () => {
  console.log('DatabaseService: creating database..')

  const db = await createRxDatabase({
    name: 'costeosapp',
    adapter: 'idb',
  })
  console.log('DatabaseService: created database')
  window['db'] = db // write to window for debugging

  // show leadership in title
  db.waitForLeadership().then(() => {
    console.log('isLeader now')
    document.title = '♛ ' + document.title
  })

  // create collections
  console.log('DatabaseService: create collections')
  await db.addCollections(collections);

  // hooks
  console.log('DatabaseService: add hooks')

  db.collections.costosfijos.preInsert((data) => {
    // cada que se inserta un nuevo elemento, crear automáticamente una id unica
    data.id = uuidv4()
    data.timestamp = new Date().getTime().toString()
  }, false)

  db.collections.unidades.preInsert((data) => {
    data.id = uuidv4()
    data.timestamp = new Date().getTime().toString()
  }, false)

  db.collections.insumos.preInsert((data) => {
    data.id = uuidv4()
    data.timestamp = new Date().getTime().toString()
  }, false)

  // sync
  let dbUrl = window.localStorage.getItem('dbUrl')
  if (dbUrl) {
    console.log('DatabaseService: sync')
    dbUrl = JSON.parse(dbUrl) // haciendo json parse porque la libreria react-use-storage aplica conversion a json
    Object.keys(collections)
      .map((colName) =>
        db[colName].sync({
          remote: `${dbUrl}/${colName}/`,
        })
      )
  } else {
    console.log('DatabaseService: offline mode')
  }

  return db
}

export const get = () => {
  if (!dbPromise) dbPromise = _create()
  return dbPromise
}
