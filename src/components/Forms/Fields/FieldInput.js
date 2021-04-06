import React from 'react'
import PropTypes from 'prop-types'

export function FieldInput({
  name,
  type,
  title,
  placeholder,
  icon,
  iconRight = null,
  errors,
  inputRef,
  onFocus = null,
  allowDecimals = false,
  disabled = false,
  infoText = null,
  ...otherprops
}) {
  const showError = errors[name]
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
          onFocus={onFocus}
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
      {showError && (
        <p className="help is-danger">
          Falta agregar {(title || placeholder || name).toLowerCase()}.
        </p>
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
  onFocus: PropTypes.func,
}
