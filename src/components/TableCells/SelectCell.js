import Select from 'react-select'

export const SelectCell = ({
  value,
  row: { index, original },
  column: { id, show_normal_callback, select_options, style },
  updateCallback, // This is a custom function that we supplied to our table instance
  isInEditMode, // indicate if the cell is in edit mode
}) => {
  // actualizando los datos cuando se cambia el valor
  const onChange = (e) => {
    updateCallback(id, e.value, original)
  }

  show_normal_callback = show_normal_callback || ((item) => item)
  let displayValue = isInEditMode
    ? value
    : show_normal_callback(value, original)

  return (
    <div style={style}>
      {!isInEditMode ? (
        <span>{displayValue}</span>
      ) : (
        <Select
          defaultValue={select_options.find((o) => o.value == value)}
          options={select_options}
          onChange={onChange}
        />
      )}
    </div>
  )
}
