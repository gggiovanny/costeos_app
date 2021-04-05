import React, { useMemo, useState } from 'react'
import { GenericForm } from '../components/Forms/GenericForm'
import { BasicTable } from '../components/Table/BasicTable'
import { useForm } from 'react-hook-form'
import { HiTag, HiMinusCircle } from 'react-icons/hi'
import { useRxInsert } from '../hooks/useRxInsert'
import { useRxSubscribe } from '../hooks/useRxSubscribe'

const subs = []

export function Unidades() {
  // Inicializando el hook para el formulario
  const { register, handleSubmit, errors, reset } = useForm()

  // creando elementos del estado
  const [unidades, setUnidades] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // usando custom hook para hacer la suscripcion
  useRxSubscribe(
    'unidades',
    {
      selector: {},
      sort: [{ timestamp: 'desc' }],
    },
    (data) => {
      setUnidades(data)
      setIsLoading(false)
    },
    subs
  )

  // usando custom hook para hacer el insert
  const addData = useRxInsert('unidades', reset)

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
        title: 'Abreviatura',
        name: 'abrev',
        type: 'text',
        icon: <HiMinusCircle />,
      },
    ],
    []
  )

  // Definiendo columnas de la tabla
  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'nombre',
      },
      {
        Header: 'Abreviatura',
        accessor: 'abrev',
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
          />
        </div>
      </div>
      <div className="column is-two-thirds">
        <BasicTable
          title="Unidades"
          cols={columns}
          data={unidades}
          rxdbMode={true}
        />
      </div>
    </div>
  )
}
