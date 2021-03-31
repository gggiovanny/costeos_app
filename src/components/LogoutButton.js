import { CgLogOut } from 'react-icons/cg'
import ReactTooltip from 'react-tooltip'

export function LogoutButton() {
  return (
    <>
      <button
        className="button is-ghost"
        onClick={() => {
          window.localStorage.clear()
          window.location.reload()
        }}
        data-tip="Cerrar sesión"
      >
        <CgLogOut />
      </button>
      <ReactTooltip place="bottom" type="light" />
    </>
  )
}
