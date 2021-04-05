import { AiFillCheckSquare, AiFillCloseSquare } from 'react-icons/ai'

export function CheckboxCell({
  value,
  row: { index, original },
  column: { id, show_normal_callback, select_options, style },
  updateCallback, // This is a custom function that we supplied to our table instance
  isInEditMode, // indicate if the cell is in edit mode
}) {
  // actualizando los datos cuando se cambia el valor
  const onChange = (e) => {
    updateCallback(id, e.currentTarget.checked, original)
  }

  return (
    <div className="is-flex is-justify-content-center">
      <label className="checkbox" disabled={!isInEditMode}>
        <input
          type="checkbox"
          onChange={onChange}
          checked={value ? true : false}
          disabled={!isInEditMode}
        />
      </label>
    </div>
  )
}
