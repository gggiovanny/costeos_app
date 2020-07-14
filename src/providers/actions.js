export function costos_fijos_actions(old_state, { addRow, editRow }) {
  if (addRow) {
    return {
      ...old_state,
      costos_fijos: [...old_state.costos_fijos, addRow],
    }
  }

  if (editRow) {
    const { rowIndex, columnId, value } = editRow
    return {
      ...old_state,
      costos_fijos: old_state.costos_fijos.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old_state.costos_fijos[rowIndex],
            [columnId]: value,
          }
        }
        return row
      }),
    }
  }
}
