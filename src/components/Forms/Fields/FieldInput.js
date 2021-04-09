import React from 'react'
import PropTypes from 'prop-types'

const or = (def, alt) => (def !== undefined ? def : alt)

let getErrorMessage = (
  error,
  { title, placeholder, name, min, max, minLength, maxLength }
) => {
  let msg = 'Campo inválido'
  const fieldname = (title || placeholder || name).toLowerCase()
  switch (error.type) {
    case 'required':
      msg = `Falta agregar ${fieldname}.`
      break
    case 'min':
    case 'max':
      msg = `El valor de ${fieldname} debe estar entre ${or(min, '?')} y ${or(
        max,
        '?'
      )}.`
      break
    case 'minLength':
    case 'maxLength':
      msg = `El campo ${fieldname} debe tener entre ${or(
        minLength,
        '?'
      )} y ${or(maxLength, '?')} caracteres.`

      break
  }
  return msg
}

export function FieldInput(props) {
  const {
    name,
    type,
    title,
    placeholder,
    icon,
    iconRight = null,
    errors,
    inputRef,
    allowDecimals = false,
    disabled = false,
    infoText = null,
    ...otherprops
  } = props
  const error = errors[name]
  return (
    <div className="field">
      {title && <label className="label">{title}</label>}
      <div className="control has-icons-left has-icons-right">
        <input
          ref={inputRef}
          className="input"
          name={name}
          type={type || 'text'}
          placeholder={placeholder || title}
          step={allowDecimals ? 'any' : '1'}
          disabled={disabled}
          {...otherprops}
        />
        {icon && (
          <span className="icon is-small is-left" style={{ zIndex: 0 }}>
            {icon}
          </span>
        )}
        {iconRight && (
          <span className="icon is-small is-right" style={{ zIndex: 0 }}>
            {iconRight}
          </span>
        )}
      </div>
      {infoText && <p className="help is-info">{infoText}</p>}
      {error && (
        <p className="help is-danger">{getErrorMessage(error, props)}</p>
      )}
    </div>
  )
}

FieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  allowDecimals: PropTypes.bool,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
  errors: PropTypes.object,
  inputRef: PropTypes.any,
}
