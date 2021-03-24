import { useMemo, useState } from 'react'
import { GenericForm } from '../components/GenericForm'
import { BasicTable } from '../components/BasicTable'
import { useForm } from 'react-hook-form'
import { HiTag } from 'react-icons/hi'
import { MdAttachMoney } from 'react-icons/md'
import { FaTrashAlt } from 'react-icons/fa'
import { useRxInsert } from '../hooks/useRxInsert'
import { useRxSubscribe } from '../hooks/useRxSubscribe'
import { SelectCell } from '../components/TableCells/SelectCell'

const subs = []

export function Insumos() {
  // Inicializando el hook para el formulario
  const { register, handleSubmit, errors, reset, control } = useForm()

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
        title: 'Unidad',
        name: 'unidad',
        type: 'select',
        data: unidadesOptions,
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
    ],
    [unidadesOptions]
  )

  // Definiendo columnas de la tabla
  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'nombre',
      },
      {
        Header: 'Unidad',
        accessor: 'unidad',
        show_normal_callback: (item, original) => {
          const unidadObj = unidades.find((u) => u.id == item)
          return unidadObj ? unidadObj.abrev : item
        },
        select_options: unidadesOptionsAbrev,
        Cell: SelectCell,
      },
      {
        Header: 'Valor de compra',
        accessor: 'valor_de_compra',
      },
      {
        Header: 'Merma',
        accessor: 'merma',
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
