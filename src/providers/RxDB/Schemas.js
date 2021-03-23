export const costofijoSchema = {
  title: 'costofijo schema',
  description: 'Es un costo que es predecible a lo largo de un mes.',
  version: 0,
  type: 'object',
  properties: {
    concepto: {
      type: 'string',
      primary: true,
    },
    costo_mensual: {
      type: 'number',
    },
  },
  required: ['costo_mensual'],
}
