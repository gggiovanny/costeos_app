export const parseSelectsData = (data) => {
  let newdata = {}
  for (const [key, val] of Object.entries(data)) {
    newdata[key] = typeof val === 'object' ? val.value : val
  }
  return newdata
}

export const applyRequiredRules = (required, disabled) => {
  // los campos por defecto son requeridos
  let isFieldRequired = required === undefined ? true : required
  // si estan desabilitados, entonces no son requeridos
  isFieldRequired = disabled ? false : isFieldRequired
  return isFieldRequired
}
