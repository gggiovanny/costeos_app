export const parseSelectsData = (data) => {
  let newdata = {}
  for (const [key, val] of Object.entries(data)) {
    newdata[key] = typeof val === 'object' ? val.value : val
  }
  return newdata
}

const applyRequiredRules = (required, disabled, type) => {
  // si es checkbox, no es requerido
  if (type == 'checkbox') return false

  // los campos por defecto son requeridos
  let isFieldRequired = required === undefined ? true : required
  // si estan desabilitados, entonces no son requeridos
  isFieldRequired = disabled ? false : isFieldRequired

  return isFieldRequired
}

export const getRegisterConfig = ({
  required,
  disabled,
  type,
  pattern,
  validate,
  min,
  max,
  minLength,
  maxLength,
}) => {
  const rules = {
    required: applyRequiredRules(required, disabled, type),
    valueAsNumber: type == 'number',
    valueAsDate: type == 'date',
    pattern: pattern,
    validate: validate,
  }
  // propiedades para validar
  if (min !== undefined) rules.min = min
  if (max !== undefined) rules.max = max
  if (minLength !== undefined) rules.minLength = minLength
  if (maxLength !== undefined) rules.maxLength = maxLength

  return rules
}
