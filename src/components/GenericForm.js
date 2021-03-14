import React from 'react'
import { FieldInput } from './FieldInput'
import PropTypes from 'prop-types'
import { FieldSelect } from './FieldSelect'

export function GenericForm({
  fields,
  register,
  handleSubmit,
  onSubmit,
  errors,
  control = null,
}) {
  const parseSelectsData = (data) => {
    let newdata = {}
    for (const [key, val] of Object.entries(data))
      newdata[key] = typeof val === 'object' ? val.value : val
      onSubmit(newdata)
    return data
  }

  return (
    <div>
      <form onSubmit={handleSubmit(parseSelectsData)}>
        {fields.map((field, index) => {
          const isFieldRequired =
            field.required === undefined ? true : field.required
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
                allowDecimals={field.allowDecimals}
                icon={field.icon}
                errors={errors}
                key={field.name + index}
              />
            )
        })}
        <input
          className="button is-success is-fullwidth"
          type="submit"
          value="Agregar"
        />
      </form>
    </div>
  )
}

GenericForm.propTypes = {
  fields: PropTypes.array.isRequired,
}
