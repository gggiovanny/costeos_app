import React, { useMemo } from 'react'
import { FormCostosFijos } from '../components/FormCostosFijos'
import { BasicTable } from '../components/BasicTable'
import { useForm } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import { addCostoFijo } from '../providers/actions'
import { useStringFormatter } from '../hooks/useStringFormatter'

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
  // hook para dar formato a los campos de las tablas
  const { money } = useStringFormatter()
  // Dandole formato a los datos que se van a mostrar en la tabla
  let formated_costos_fijos = useMemo(
    () =>
      costos_fijos.map((costo) => ({
        concepto: costo.concepto,
        costo_mensual: money.format(costo.costo_mensual),
      })),
    [costos_fijos, money]
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
        <BasicTable columns={columns} data={formated_costos_fijos} />
      </div>
    </div>
  )
}
