import { useState, useEffect } from 'react'
import { useStringFormatter } from '../../hooks/useStringFormatter'

export const EditableCell = ({
  value: initialValue,
  row: { index, original },
  column: { id, show_normal_callback, show_editing_callback, style },
  updateCallback, // This is a custom function that we supplied to our table instance
  money_column, // custom prop passed
  isInEditMode, // indicate if the cell is in edit mode
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)
  // Para llevar control de si el campo esta siendo editado
  const [isEditing, setIsEditing] = useState(false)
  // hook para dar formato a los campos de las tablas
  const { money, toFloat } = useStringFormatter()

  const onChange = (e) => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateCallback(id, value, original)
    setIsEditing(false)
  }

  const onFocus = (e) => {
    setIsEditing(true)
    if (id === money_column) setValue(toFloat(value))
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  show_editing_callback = show_editing_callback || ((item) => item)
  show_normal_callback = show_normal_callback || ((item) => item)

  let displayValue = isEditing
    ? show_editing_callback(value, original)
    : show_normal_callback(value, original)

  displayValue =
    id === money_column && !isEditing ? money.format(value) : displayValue

  return (
    <div style={style}>
      {!isInEditMode ? (
        <span>{displayValue}</span>
      ) : (
        <input
          className="input"
          value={displayValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          type={id === money_column && isEditing ? 'number' : 'text'}
        />
      )}
    </div>
  )
}
