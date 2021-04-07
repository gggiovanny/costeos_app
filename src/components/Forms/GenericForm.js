import PropTypes from 'prop-types'
import { FieldInput } from './Fields/FieldInput'
import { FieldSelect } from './Fields/FieldSelect'
import { FieldCheckbox } from './Fields/FieldCheckbox'
import { parseSelectsData, applyRequiredRules } from './Helpers'

export function GenericForm({
  fields,
  register,
  handleSubmit,
  onSubmit,
  errors,
  control = null,
  buttonText = 'Agregar',
}) {
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(parseSelectsData(data))
        })}
      >
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
            let isFieldRequired = applyRequiredRules(required, disabled)
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
