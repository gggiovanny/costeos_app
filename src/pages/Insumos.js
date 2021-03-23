import React, { useMemo, useState } from 'react'
import { GenericForm } from '../components/GenericForm'
import { BasicTable } from '../components/BasicTable'
import { useForm } from 'react-hook-form'
import { HiTag } from 'react-icons/hi'
import { MdAttachMoney } from 'react-icons/md'
import { FaTrashAlt } from 'react-icons/fa'
import { useRxInsert } from '../hooks/useRxInsert'
import { useRxSubscribe } from '../hooks/useRxSubscribe'

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

  // Campos del formulario
  const fields = React.useMemo(
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
        data: unidades.map((uni) => ({ value: uni.id, label: uni.nombre })),
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
    [unidades]
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
        show_normal_callback: (item) => {
          return item
        },
        show_editing_callback: (item) => {
          return item
        },
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
    []
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
      <div className="column">
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
