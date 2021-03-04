import React from 'react'
import FieldInput from './FieldInput'
import PropTypes from 'prop-types'

export function GenericForm({
  fields,
  register,
  handleSubmit,
  postMutation,
  errors,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit(postMutation.mutate)}>
        {fields.map((field, index) => (
          <FieldInput
            inputRef={register({
              required: field.required === undefined ? true : field.required,
            })}
            title={field.title}
            name={field.name}
            type={field.type}
            allowDecimals={field.allowDecimals}
            icon={field.icon}
            errors={errors}
            key={field.name + index}
            onFocus={() => postMutation.reset()}
          />
        ))}
        <input
          className="button is-success is-fullwidth"
          type="submit"
          value="Agregar"
        />
        <>
          {postMutation.isLoading ? 'Agregando...' : null}
          {postMutation.isError
            ? 'Ocurrió un error:' + postMutation.error.message
            : null}
          {postMutation.isSuccess ? 'Éxito al agregar!' : null}
        </>
      </form>
    </div>
  )
}

GenericForm.propTypes = {
  fields: PropTypes.array.isRequired,
}
