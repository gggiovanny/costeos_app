import Select from 'react-select'

import { Controller } from 'react-hook-form'

export const FieldSelect = ({
  data,
  control,
  required,
  name,
  title,
  errors,
  onFocus = null,
}) => (
  <div className="field">
    {title && <label className="label">{title}</label>}
    <div className="control">
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        options={data}
        defaultValue={''}
        onFocus={onFocus}
        as={Select}
      />
    </div>
    {errors[name] && (
      <p className="help is-danger">Falta agregar {title.toLowerCase()}.</p>
    )}
  </div>
)
