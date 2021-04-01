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
          window.location.href = '/'
          await removeRxDatabase('costeosapp', 'idb')
        }}
        data-tip="Cerrar sesión"
      >
        <CgLogOut />
      </button>
      <ReactTooltip place="bottom" type="light" />
    </>
  )
}
