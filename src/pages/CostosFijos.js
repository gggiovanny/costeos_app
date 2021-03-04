import React, { useMemo } from 'react'
import { GenericForm } from '../components/GenericForm'
import { BasicTable } from '../components/BasicTable'
import { useForm } from 'react-hook-form'
import { FaClipboardList } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import costeosapi from '../providers/costeosapi'

let getCostoFijo = () => costeosapi.get('costosfijos').then((res) => res.data)
let postCostoFijo = (costofijo) => costeosapi.post('costosfijos', costofijo)
let putCostoFijo = (updated_costofijo) => costeosapi.put(`costosfijos/${updated_costofijo.id}`, updated_costofijo)

export function CostosFijos() {
  // Inicializando react-query
  const queryClient = useQueryClient()
  // Inicializando el hook para el formulario
  const { register, handleSubmit, errors, reset } = useForm()

  // obteniendo datos de costos fijos
  const { isLoading, error, data } = useQuery('costos_fijos', getCostoFijo)
  // creando mutacion para agregar costosfijos
  const mutationCostoFijo = useMutation(postCostoFijo, {
    onSuccess: () => {
      queryClient.invalidateQueries('costos_fijos')
      reset()
    },
  })
  // creando mutación para actualizar costosfijos

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
  
  // lambda usado por la tabla para eliminar datos al state de la tabla
  const deleteData = (row) => {}

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="columns is-variable is-3">
      <div className="column">
        <div className="box">
          <GenericForm
            fields={fields}
            register={register}
            handleSubmit={handleSubmit}
            postMutation={mutationCostoFijo}
            errors={errors}
          />
        </div>
      </div>
      <div className="column">
        <BasicTable
          title="Costos Fijos"
          cols={columns}
          data={data}
          money_column="costo_mensual"
          showTotal={true}
          update_callback={putCostoFijo}
          deleteData={deleteData}
        />
      </div>
    </div>
  )
}
