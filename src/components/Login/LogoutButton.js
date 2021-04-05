import { CgLogOut } from 'react-icons/cg'
import ReactTooltip from 'react-tooltip'
import { removeRxDatabase } from 'rxdb'

export function LogoutButton() {
  return (
    <>
      <button
        className="button is-ghost"
        onClick={async () => {
          window.localStorage.clear()
          if (process.env.NODE_ENV === 'development') {
            // quitando bases de datos locales
            await removeRxDatabase('costeosapp', 'idb')
            // borrar todas las bases de datos restantes
            window.indexedDB
              .databases()
              .then((r) => {
                for (var i = 0; i < r.length; i++)
                  window.indexedDB.deleteDatabase(r[i].name)
              })
              .then(() => {
                console.warn('All data cleared.')
              })
          }

          window.location.href = '/'
        }}
        data-tip="Cerrar sesión"
      >
        <CgLogOut />
      </button>
      <ReactTooltip place="bottom" type="light" />
    </>
  )
}
