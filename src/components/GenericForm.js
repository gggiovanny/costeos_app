import React from 'react'
import FieldInput from './FieldInput'

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
        {fields.map((field) => (
          <FieldInput
            inputRef={register({ required: true })}
            title={field.title}
            name={field.name}
            type={field.type}
            icon={field.icon}
            errors={errors}
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
