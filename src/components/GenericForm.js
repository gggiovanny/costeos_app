import React from 'react'
import FieldInput from './FieldInput'
import PropTypes from 'prop-types'

export function GenericForm({
  fields,
  register,
  handleSubmit,
  onSubmit,
  errors,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <FieldInput
            inputRef={register({ required: field.required === undefined ? true : field.required })}
            title={field.title}
            name={field.name}
            type={field.type}
            icon={field.icon}
            errors={errors}
            key={field.name+index}
          />
        ))}
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