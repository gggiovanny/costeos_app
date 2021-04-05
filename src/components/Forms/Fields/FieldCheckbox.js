export function FieldCheckbox({
  inputRef,
  title,
  name,
  errors,
  disabled = false,
  ...otherprops
}) {
  return (
    <div className="field">
      <div className="control">
        <label className="checkbox" disabled={disabled}>
          <input
            type="checkbox"
            ref={inputRef}
            name={name}
            disabled={disabled}
            {...otherprops}
          />
          <span className="ml-1">{title}</span>
        </label>
        {errors[name] && (
          <p className="help is-danger">Falta agregar {title.toLowerCase()}.</p>
        )}
      </div>
    </div>
  )
}
