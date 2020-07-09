import React from 'react'
import { FormCostosFijos } from '../components/FormCostosFijos'
import { BasicTable } from '../components/BasicTable'
import { useForm } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import { addCostoFijo } from '../providers/actions'

export function CostosFijos() {
  // Inicializando el manejador global del state
  const {
    action,
    state: { costos_fijos },
  } = useStateMachine(addCostoFijo)
  // Inicializando el hook para el formulario
  const { register, handleSubmit, errors, reset } = useForm()
  // lambda usado por el formulario para agregar datos al state de la tabla
  const addData = (data) => {
    action(data)
    reset()
  }
  // Definiendo columnas de la tabla
  const columns = React.useMemo(
    () => [
      {
        Header: 'Costos Fijos',
        columns: [
          {
            Header: 'Concepto',
            accessor: 'concepto',
          },
          {
            Header: 'Costo mensual',
            accessor: 'costo_mensual',
          },
        ],
      },
    ],
    []
  )

  return (
    <div className="columns is-variable is-3">
      <div className="column">
        <div className="box">
          <FormCostosFijos
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={addData}
            errors={errors}
          />
        </div>
      </div>
      <div className="column">
        <div className="box">
          <BasicTable columns={columns} data={costos_fijos} />
        </div>
      </div>
    </div>
  )
}
