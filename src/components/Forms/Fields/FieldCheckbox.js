export function FieldCheckbox({ inputRef, title, name, errors }) {
  return (
    <div className="field">
      <div className="control">
        <label className="checkbox">
          <input type="checkbox" ref={inputRef} name={name} />
          <span className="ml-1">{title}</span>
        </label>
        {errors[name] && (
          <p className="help is-danger">Falta agregar {title.toLowerCase()}.</p>
        )}
      </div>
    </div>
  )
}
