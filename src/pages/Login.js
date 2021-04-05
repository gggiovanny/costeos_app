import { LoginForm } from '../components/Login/LoginForm'
export function Login() {
  return (
    <div className="columns is-centered mt-4 ">
      <div className="column  is-half">
        <h1 className="title">Iniciar sesión </h1>
        <LoginForm />
      </div>
    </div>
  )
}
