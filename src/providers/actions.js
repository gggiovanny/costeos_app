export function costos_fijos_actions(
  old_state,
  { addRow, editRow, deleteRow }
) {
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

  if (deleteRow) {
    return {
      ...old_state,
      costos_fijos: old_state.costos_fijos.filter(
        (element, index) => index !== deleteRow
      ),
    }
  }
}

export function insumos_actions(
  old_state,
  { addRow, editRow, deleteRow }
) {
  if (addRow) {
    return {
      ...old_state,
      insumos: [...old_state.insumos, addRow],
    }
  }

  if (editRow) {
    const { rowIndex, columnId, value } = editRow
    return {
      ...old_state,
      insumos: old_state.insumos.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old_state.insumos[rowIndex],
            [columnId]: value,
          }
        }
        return row
      }),
    }
  }

  if (deleteRow) {
    return {
      ...old_state,
      insumos: old_state.insumos.filter(
        (element, index) => index !== deleteRow
      ),
    }
  }
}

