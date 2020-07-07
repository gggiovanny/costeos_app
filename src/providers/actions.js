export function addCostoFijo(state, payload) {
  return {
    ...state,
    costos_fijos: [...state.costos_fijos, payload],
  }
}
