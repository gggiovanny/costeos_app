const costofijoSchema = {
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

const unidadesSchema = {
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

const insumosSchema = {
  title: 'insumos schema',
  description: 'Registro de insumos',
  version: 1,
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
    unidad_compra: {
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
    proveedor: {
      type: 'string',
    },
    marca: {
      type: 'string',
    },
  },
  required: ['nombre'],
  indexes: ['timestamp'],
}

export const collections = {
  costosfijos: {
    schema: costofijoSchema,
  },
  unidades: {
    schema: unidadesSchema,
  },
  insumos: {
    schema: insumosSchema,
    migrationStrategies: {
      // 1 means, this transforms data from version 0 to version 1
      1: function (oldDoc) {
        // convirtiendo campos numericos mal capturados
        oldDoc.factor_conversion = toNum(oldDoc.factor_conversion, 1)
        oldDoc.merma = toNum(oldDoc.merma, 0)
        oldDoc.stock_minimo = toNum(oldDoc.stock_minimo, null)
        // renombrando unidad_entrada -> unidad_compra
        oldDoc.unidad_compra = oldDoc.unidad_entrada
        delete oldDoc.unidad_entrada
        return oldDoc
      },
    },
  },
}

const toNum = (str_num, default_val) =>
  str_num ? parseFloat(str_num) : default_val
