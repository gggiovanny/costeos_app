import React, { useMemo, useState } from 'react'
import { GenericForm } from '../components/GenericForm'
import { BasicTable } from '../components/BasicTable'
import { useForm } from 'react-hook-form'
import { FaClipboardList } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'
import { useRxInsert } from '../hooks/useRxInsert'
import { useRxSubscribe } from '../hooks/useRxSubscribe'

const subs = []

export function CostosFijos() {
  // Inicializando el hook para el formulario
  const { register, handleSubmit, errors, reset } = useForm()

  // creando elementos del estado
  const [costosfijos, setCostosfijos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // usando custom hook para hacer la suscripcion
  useRxSubscribe(
    'costosfijos',
    {
      selector: {},
      sort: [{ timestamp: 'desc' }],
    },
    (data) => {
      setCostosfijos(data)
      setIsLoading(false)
    },
    subs
  )

  // usando custom hook para hacer el insert
  const addCostoFijo = useRxInsert('costosfijos', reset)

  // Campos del formulario
  const fields = React.useMemo(
    () => [
      {
        title: 'Concepto',
        name: 'concepto',
        type: 'text',
        icon: <FaClipboardList />,
      },
      {
        title: 'Costo mensual',
        name: 'costo_mensual',
        type: 'number',
        allowDecimals: true,
        icon: <MdAttachMoney />,
      },
    ],
    []
  )

  // Definiendo columnas de la tabla
  const columns = useMemo(
    () => [
      {
        Header: 'Concepto',
        accessor: 'concepto',
      },
      {
        Header: 'Costo mensual',
        accessor: 'costo_mensual',
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
            onSubmit={addCostoFijo}
            errors={errors}
          />
        </div>
      </div>
      <div className="column">
        <BasicTable
          title="Costos Fijos"
          cols={columns}
          data={costosfijos}
          money_column="costo_mensual"
          showTotal={true}
          rxdbMode={true}
        />
      </div>
    </div>
  )
}
