import React from 'react'
import { FieldInput } from './Fields/FieldInput'
import PropTypes from 'prop-types'
import { FieldSelect } from './Fields/FieldSelect'
import { FieldCheckbox } from './Fields/FieldCheckbox'

export function GenericForm({
  fields,
  register,
  handleSubmit,
  onSubmit,
  errors,
  control = null,
  buttonText = 'Agregar',
}) {
  const parseSelectsData = (data) => {
    let newdata = {}
    for (const [key, val] of Object.entries(data)) {
      newdata[key] = typeof val === 'object' ? val.value : val
    }
    onSubmit(newdata)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(parseSelectsData)}>
        {fields.map(
          (
            {
              required,
              disabled,
              type,
              title,
              name,
              data,
              placeholder,
              allowDecimals,
              icon,
              ...otherprops
            },
            index
          ) => {
            // los campos por defecto son requeridos
            let isFieldRequired = required === undefined ? true : required
            // si estan desabilitados, entonces no son requeridos
            isFieldRequired = disabled ? false : isFieldRequired
            if (type == 'select')
              return (
                <FieldSelect
                  control={control}
                  required={isFieldRequired}
                  title={title}
                  name={name}
                  errors={errors}
                  key={name + index}
                  data={data}
                  disabled={disabled}
                  {...otherprops}
                />
              )
            else if (type == 'checkbox')
              return (
                <FieldCheckbox
                  inputRef={register({
                    required: false,
                  })}
                  title={title}
                  name={name}
                  errors={errors}
                  key={name + index}
                  disabled={disabled}
                  {...otherprops}
                />
              )
            else
              return (
                <FieldInput
                  inputRef={register({
                    required: isFieldRequired,
                  })}
                  title={title}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  allowDecimals={allowDecimals}
                  icon={icon}
                  errors={errors}
                  key={name + index}
                  disabled={disabled}
                  {...otherprops}
                />
              )
          }
        )}
        <input
          className="button is-success is-fullwidth"
          type="submit"
          value={buttonText}
        />
      </form>
    </div>
  )
}

GenericForm.propTypes = {
  fields: PropTypes.array.isRequired,
}
