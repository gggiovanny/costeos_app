import { GenericForm } from './GenericForm'
import { useForm } from 'react-hook-form'
import { RiUser5Fill } from 'react-icons/ri'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { MdCloud } from 'react-icons/md'
import { useMemo } from 'react'
import { useLocalStorage } from 'react-use-storage'

const login = (db_url, name, password) => {
  const params = new URLSearchParams({ name, password })
  return fetch(`${db_url}/_session`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: params,
  }).then((res) => res.json())
}

export function LoginForm() {
  // Inicializando el hook para el formulario
  const { register, handleSubmit, errors, reset } = useForm()
  // acceso a localstorage
  const [isLogged, setIsLogged] = useLocalStorage('isLogged', false)
  const [dbUrl, setDbUrl] = useLocalStorage('dbUrl', '')

  // funcion para logearse
  const onSubmit = ({ db_url, name, password }) => {
    login(db_url, name, password).then((res) => {
      if (res.ok) {
        setDbUrl(db_url)
        setIsLogged(true)
      }
    })
  }

  // Campos del formulario
  const fields = useMemo(
    () => [
      {
        placeholder: 'URL de Base de datos ',
        name: 'db_url',
        type: 'text',
        icon: <MdCloud />,
      },
      {
        placeholder: 'Usuario',
        name: 'name',
        type: 'text',
        icon: <RiUser5Fill />,
      },
      {
        placeholder: 'Contraseña',
        name: 'password',
        type: 'password',
        icon: <BsFillShieldLockFill />,
      },
    ],
    []
  )

  return (
    <GenericForm
      fields={fields}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      buttonText="Iniciar sesión"
    />
  )
}
