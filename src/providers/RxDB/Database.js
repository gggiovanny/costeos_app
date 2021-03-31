import { createRxDatabase, removeRxDatabase, addRxPlugin } from 'rxdb'
import { costofijoSchema, unidadesSchema, insumosSchema } from './Schemas'
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

const collections = [
  {
    name: 'costosfijos',
    schema: costofijoSchema,
    sync: true,
  },
  {
    name: 'unidades',
    schema: unidadesSchema,
    sync: true,
  },
  {
    name: 'insumos',
    schema: insumosSchema,
    sync: true,
  },
]

let dbPromise = null

const _create = async () => {
  console.log('DatabaseService: creating database..')

  // // en modo desarrollo, borrar la base de datos anterior
  //   await removeRxDatabase('costeosapp', 'idb')

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
  await Promise.all(collections.map((colData) => db.collection(colData)))

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
    collections
      .filter((col) => col.sync)
      .map((col) => col.name)
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
