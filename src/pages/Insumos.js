import { useMemo, useState, useEffect } from 'react'
import { GenericForm } from '../components/Forms/GenericForm'
import { BasicTable } from '../components/Table/BasicTable'
import { useForm } from 'react-hook-form'
import { HiTag } from 'react-icons/hi'
import { MdAttachMoney } from 'react-icons/md'
import { FaTrashAlt, FaWarehouse } from 'react-icons/fa'
import { BsFillGearFill } from 'react-icons/bs'
import { useRxInsert } from '../hooks/useRxInsert'
import { useRxSubscribe } from '../hooks/useRxSubscribe'
import { SelectCell } from '../components/Table/Cells/SelectCell'
import { CheckboxCell } from '../components/Table/Cells/CheckboxCell'

const subs = []

export function Insumos() {
  // Inicializando el hook para el formulario
  const {
    register,
    handleSubmit,
    errors,
    reset,
    control,
    watch,
    setValue,
  } = useForm()

  // creando elementos del estado
  const [insumos, setInsumos] = useState([])
  const [unidades, setUnidades] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // usando custom hook para hacer la suscripcion
  useRxSubscribe(
    'insumos',
    {
      selector: {},
      sort: [{ timestamp: 'desc' }],
    },
    (data) => {
      setInsumos(data)
      setIsLoading(false)
    },
    subs
  )
  useRxSubscribe(
    'unidades',
    {
      selector: {},
      sort: [{ abrev: 'asc' }],
    },
    (data) => {
      setUnidades(data)
    },
    subs
  )

  // usando custom hook para hacer el insert
  const addData = useRxInsert('insumos', reset)

  // opcions del select de insumos normal
  const unidadesOptions = useMemo(
    () => unidades.map((uni) => ({ value: uni.id, label: uni.nombre })),
    [unidades]
  )

  // opcions del select de insumos abreviado
  const unidadesOptionsAbrev = useMemo(
    () => unidades.map((uni) => ({ value: uni.id, label: uni.abrev })),
    [unidades]
  )

  // campos del formulario que se observan mientras se modifican
  const unidadSalida = watch('unidad_salida')
  const unidadEntrada = watch('unidad_compra')
  // usado como unidad de stock_minimo
  const unidadStockAbrev = useMemo(
    () =>
      unidadSalida && unidadesOptionsAbrev
        ? unidadesOptionsAbrev.find((u) => u.value == unidadSalida.value).label
        : '',
    [unidadSalida, unidadesOptionsAbrev]
  )
  // usado para desactivar campos
  const noEsencial = watch('contar_en_almacen')
  // texto de info de conversion
  const factorConversion = watch('factor_conversion')
  const conversionInfo = useMemo(
    () =>
      unidadEntrada && unidadSalida
        ? `1 ${unidadEntrada.label} equivale a ${factorConversion || 'N'} ${
            unidadSalida.label
          }s`
        : null,
    [unidadEntrada, unidadSalida, factorConversion]
  )
  // si el factor de conversion debe estar activo
  const factorConversionDisabled = useMemo(() => {
    return unidadEntrada == unidadSalida
  }, [unidadEntrada, unidadSalida])

  useEffect(() => {
    // si hay definida unidad de entrada pero no de salida, la de salida es igual a la de entrada
    if (unidadEntrada && !unidadSalida) {
      setValue('unidad_salida', unidadEntrada)
    }
  }, [unidadEntrada])

  // Campos del formulario
  const fields = useMemo(
    () => [
      {
        title: 'Nombre',
        name: 'nombre',
        type: 'text',
        icon: <HiTag />,
      },
      {
        title: 'Unidad de compra',
        name: 'unidad_compra',
        type: 'select',
        data: unidadesOptions,
      },
      {
        title: 'Unidad de salida',
        name: 'unidad_salida',
        type: 'select',
        data: unidadesOptions,
      },
      {
        title: 'Factor de conversión',
        name: 'factor_conversion',
        type: 'number',
        allowDecimals: true,
        defaultValue: 1,
        icon: <BsFillGearFill />,
        infoText: !factorConversionDisabled && conversionInfo,
        disabled: factorConversionDisabled,
      },
      {
        title: 'Valor de compra',
        name: 'valor_de_compra',
        type: 'number',
        allowDecimals: true,
        icon: <MdAttachMoney />,
      },
      {
        title: 'Merma',
        name: 'merma',
        type: 'number',
        allowDecimals: true,
        icon: <FaTrashAlt />,
      },
      {
        title: 'Artículo no esencial en almacén',
        name: 'contar_en_almacen',
        type: 'checkbox',
      },
      {
        title: 'Stock mínimo',
        name: 'stock_minimo',
        type: 'number',
        allowDecimals: true,
        disabled: noEsencial,
        icon: <FaWarehouse />,
        iconRight: <span style={{ color: '#696969' }}>{unidadStockAbrev}</span>,
      },
    ],
    [
      unidadesOptions,
      noEsencial,
      unidadStockAbrev,
      conversionInfo,
      factorConversionDisabled,
    ]
  )

  // Definiendo columnas de la tabla
  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'nombre',
      },
      {
        Header: 'Uni. ent.',
        accessor: 'unidad_compra',
        show_normal_callback: (item, original) => {
          const unidadObj = unidades.find((u) => u.id == item)
          return unidadObj ? unidadObj.abrev : item
        },
        select_options: unidadesOptionsAbrev,
        Cell: SelectCell,
      },
      {
        Header: 'Uni. sal.',
        accessor: 'unidad_salida',
        show_normal_callback: (item, original) => {
          const unidadObj = unidades.find((u) => u.id == item)
          return unidadObj ? unidadObj.abrev : item
        },
        select_options: unidadesOptionsAbrev,
        Cell: SelectCell,
      },
      {
        Header: 'Factor de conversión',
        accessor: 'factor_conversion',
      },
      {
        Header: 'Valor de compra',
        accessor: 'valor_de_compra',
      },
      {
        Header: 'Merma',
        accessor: 'merma',
      },
      {
        Header: 'No esencial',
        accessor: 'contar_en_almacen',
        Cell: CheckboxCell,
      },
      {
        Header: 'Stock min.',
        accessor: 'stock_minimo',
      },
    ],
    [unidades]
  )

  if (isLoading) return 'Loading...'

  return (
    <div className="columns is-variable is-3">
      <div className="column">
        <div className="box">
          <GenericForm
            fields={fields}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={addData}
            errors={errors}
            control={control}
          />
        </div>
      </div>
      <div className="column is-two-thirds">
        <BasicTable
          title="Insumos"
          cols={columns}
          data={insumos}
          money_column="valor_de_compra"
          rxdbMode={true}
        />
      </div>
    </div>
  )
}
