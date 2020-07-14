import React, { useMemo } from 'react'
import { FormCostosFijos } from '../components/FormCostosFijos'
import { BasicTable } from '../components/BasicTable'
import { useForm } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import { costos_fijos_actions } from '../providers/actions'
import { useStringFormatter } from '../hooks/useStringFormatter'

export function CostosFijos() {
  // Inicializando el manejador global del state para agregar y editar elementos
  const {
    action,
    state: { costos_fijos },
  } = useStateMachine(costos_fijos_actions)
  // Inicializando el hook para el formulario
  const { register, handleSubmit, errors, reset } = useForm()
  // lambda usado por el formulario para agregar datos al state de la tabla
  const addData = (data) => {
    action({ addRow: data })
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
  // Calculando total
  const total = useMemo(() => {
    let total = 0
    costos_fijos.forEach((row) => {
      total += parseFloat(row.costo_mensual)
    })
    return total
  }, [costos_fijos, money])

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    action({
      editRow: { rowIndex: rowIndex, columnId: columnId, value: value },
    })
  }

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false)
  }, [costos_fijos])

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
        <BasicTable
          columns={columns}
          data={costos_fijos}
          total={total}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
      </div>
    </div>
  )
}
