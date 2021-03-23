export const costofijoSchema = {
  title: 'costofijo schema',
  description: 'Es un costo que es predecible a lo largo de un mes.',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    timestamp: {
      type: 'string',
    },
    concepto: {
      type: 'string',
    },
    costo_mensual: {
      type: 'number',
    },
  },
  required: ['costo_mensual'],
  indexes: ['id', 'timestamp'],
}

export const unidadesSchema = {
  title: 'unidades schema',
  description: 'Catálogo de unidades',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    timestamp: {
      type: 'string',
    },
    abrev: {
      type: 'string',
    },
    nombre: {
      type: 'string',
    },
  },
  required: ['nombre'],
  indexes: ['abrev', 'timestamp'],
}
