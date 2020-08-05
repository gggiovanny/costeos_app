import React from 'react'
import PropTypes from 'prop-types'

export function FieldInput({
  name,
  type,
  title,
  placeholder,
  icon,
  errors,
  inputRef,
}) {
  const showError = errors[name]
  return (
    <div className="field">
      {title && <label className="label">{title}</label>}
      <div className="control has-icons-left">
        <input
          ref={inputRef}
          className="input"
          name={name}
          type={type || 'text'}
          placeholder={placeholder || title}
        />
        {icon && <span className="icon is-small is-left">{icon}</span>}
      </div>
      {showError && (
        <p className="help is-danger">Falta agregar {title.toLowerCase()}.</p>
      )}
    </div>
  )
}

FieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  title: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
  errors: PropTypes.object,
  inputRef: PropTypes.any,
}

export default FieldInput
