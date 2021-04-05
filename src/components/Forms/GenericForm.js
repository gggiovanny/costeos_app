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
        {fields.map((field, index) => {
          // los campos por defecto son requeridos
          let isFieldRequired =
            field.required === undefined ? true : field.required
          // si estan desabilitados, entonces no son requeridos
          isFieldRequired = field.disabled ? false : isFieldRequired
          if (field.type == 'select')
            return (
              <FieldSelect
                control={control}
                required={isFieldRequired}
                title={field.title}
                name={field.name}
                errors={errors}
                key={field.name + index}
                data={field.data}
                disabled={field.disabled}
                onChange={field.onChange}
              />
            )
          else if (field.type == 'checkbox')
            return (
              <FieldCheckbox
                inputRef={register({
                  required: false,
                })}
                title={field.title}
                name={field.name}
                errors={errors}
                key={field.name + index}
                disabled={field.disabled}
                onChange={field.onChange}
              />
            )
          else
            return (
              <FieldInput
                inputRef={register({
                  required: isFieldRequired,
                })}
                title={field.title}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                allowDecimals={field.allowDecimals}
                icon={field.icon}
                errors={errors}
                key={field.name + index}
                disabled={field.disabled}
                onChange={field.onChange}
              />
            )
        })}
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
