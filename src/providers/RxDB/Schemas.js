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
  indexes: ['timestamp'],
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

export const insumosSchema = {
  title: 'insumos schema',
  description: 'Registro de insumos',
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
    nombre: {
      type: 'string',
    },
    unidad_entrada: {
      ref: 'unidades',
      type: 'string',
    },
    unidad_salida: {
      ref: 'unidades',
      type: 'string',
    },
    factor_conversion: {
      type: 'number',
    },
    valor_de_compra: {
      type: 'string',
    },
    merma: {
      type: 'number',
    },
    contar_en_almacen: {
      type: 'boolean',
    },
    stock_minimo: {
      type: 'number',
    },
  },
  required: ['nombre'],
  indexes: ['timestamp'],
}
