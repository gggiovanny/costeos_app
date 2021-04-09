import { Children, cloneElement } from 'react'
import { parseSelectsData, getRegisterConfig } from './Helpers'

export function FormWrapper({
  register,
  handleSubmit,
  onSubmit,
  errors,
  control = null,
  buttonText = 'Agregar',
  children,
}) {
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(parseSelectsData(data))
      })}
    >
      {Children.map(children, (Field, index) => {
        let { name } = Field.props
        const registerConfig = getRegisterConfig(Field.props)
        // agregando props a cada Field hijo de FormWrapper para controlarlos con react-hook-form
        return cloneElement(Field, {
          inputRef: register(registerConfig),
          rules: registerConfig,
          errors: errors,
          key: name + index,
          control: control,
        })
      })}
      <input
        className="button is-success is-fullwidth"
        type="submit"
        value={buttonText}
      />
    </form>
  )
}
