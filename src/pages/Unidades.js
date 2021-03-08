import React, { useMemo } from 'react'
import { GenericForm } from '../components/GenericForm'
import { BasicTable } from '../components/BasicTable'
import { useForm } from 'react-hook-form'
import { HiTag, HiMinusCircle } from 'react-icons/hi'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import costeosapi from '../providers/costeosapi'

export const getUnidades = () => costeosapi.get('unidades').then((res) => res.data)
const postUnidad = (unidad) => costeosapi.post('unidades', unidad)
const putUnidad = (updated_unidad) =>
  costeosapi.put(`unidades/${updated_unidad.id}`, updated_unidad)
const deleteUnidad = (id) => costeosapi.delete(`unidades/${id}`)

export function Unidades() {
  // Inicializando react-query
  const queryClient = useQueryClient()
  // Inicializando el hook para el formulario
  const { register, handleSubmit, errors, reset } = useForm()

  // obteniendo datos de unidades
  const { isLoading, error, data } = useQuery('unidades', getUnidades)
  // creando mutacion para agregar unidades
  const postUnidadMut = useMutation(postUnidad, {
    onSuccess: () => {
      queryClient.invalidateQueries('unidades') // actualiza los datos de la tabla
      reset() // reseteando el formulario
    },
  })
  // creando mutación para actualizar unidades
  const putUnidadMut = useMutation(putUnidad) // No invalidar querys, porque el backend debe acatar lo que indique el frontend
  // creando mutación para borrar unidades
  const deleteUnidadMut = useMutation(deleteUnidad, {
    onSuccess: () => {
      queryClient.invalidateQueries('unidades') // actualiza los datos de la tabla
    },
  })

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
        Header: 'ID',
        accessor: 'id',
      },
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

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="columns is-variable is-3">
      <div className="column">
        <div className="box">
          <GenericForm
            fields={fields}
            register={register}
            handleSubmit={handleSubmit}
            postMutation={postUnidadMut}
            errors={errors}
          />
        </div>
      </div>
      <div className="column">
        <BasicTable
          title="Unidades"
          cols={columns}
          data={data}
          update_callback={putUnidadMut.mutate}
          deleteData={deleteUnidadMut.mutate}
        />
      </div>
    </div>
  )
}
