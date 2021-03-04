import React, { useMemo } from 'react'
import { GenericForm } from '../components/GenericForm'
import { BasicTable } from '../components/BasicTable'
import { useForm } from 'react-hook-form'
import { FaClipboardList } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import costeosapi from '../providers/costeosapi'

const getCostoFijo = () => costeosapi.get('costosfijos').then((res) => res.data)
const postCostoFijo = (costofijo) => costeosapi.post('costosfijos', costofijo)
const putCostoFijo = (updated_costofijo) =>
  costeosapi.put(`costosfijos/${updated_costofijo.id}`, updated_costofijo)
const deleteCostoFijo = (id) => costeosapi.delete(`costosfijos/${id}`)

export function CostosFijos() {
  // Inicializando react-query
  const queryClient = useQueryClient()
  // Inicializando el hook para el formulario
  const { register, handleSubmit, errors, reset } = useForm()

  // obteniendo datos de costos fijos
  const { isLoading, error, data } = useQuery('costos_fijos', getCostoFijo)
  // creando mutacion para agregar costosfijos
  const postCostoFijoMut = useMutation(postCostoFijo, {
    onSuccess: () => {
      queryClient.invalidateQueries('costos_fijos') // actualiza los datos de la tabla
      reset() // reseteando el formulario
    },
  })
  // creando mutación para actualizar costosfijos
  const putCostdoFijoMut = useMutation(putCostoFijo) // No invalidar querys, porque el backend debe acatar lo que indique el frontend
  // creando mutación para borrar costosfijos
  const deleteCostoFijoMut = useMutation(deleteCostoFijo, {
    onSuccess: () => {
      queryClient.invalidateQueries('costos_fijos') // actualiza los datos de la tabla
    },
  })

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
            postMutation={postCostoFijoMut}
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
          update_callback={putCostdoFijoMut.mutate}
          deleteData={deleteCostoFijoMut.mutate}
        />
      </div>
    </div>
  )
}
