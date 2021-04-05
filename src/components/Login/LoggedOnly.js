import { useLocalStorage } from 'react-use-storage'
import { Login } from '../../pages/Login'
import { Children } from 'react'

export function LoggedOnly({ children }) {
  const [isLogged, setIsLogged] = useLocalStorage('isLogged', false)

  return isLogged ? Children.map(children, (child) => child) : <Login />
}
