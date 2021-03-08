import React from 'react'
import FieldInput from './FieldInput'
import PropTypes from 'prop-types'
import { FieldSelect } from './FieldSelect'

export function GenericForm({
  fields,
  register,
  handleSubmit,
  postMutation,
  errors,
  control = null,
}) {
  const parseSelectsData = (data) => {
    let newdata = {}
    for (const [key, val] of Object.entries(data))
      newdata[key] = typeof val === 'object' ? val.value : val
    console.log(newdata);
    postMutation.mutate(newdata)
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
                onFocus={() => postMutation.reset()}
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
                onFocus={() => postMutation.reset()}
              />
            )
        })}
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
