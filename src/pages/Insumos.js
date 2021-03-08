import React, { useMemo } from 'react'
import { GenericForm } from '../components/GenericForm'
import { BasicTable } from '../components/BasicTable'
import { useForm } from 'react-hook-form'
import { HiTag } from 'react-icons/hi'
import { MdAttachMoney } from 'react-icons/md'
import { FaRulerVertical } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import costeosapi from '../providers/costeosapi'
import { getUnidades } from './Unidades'

const getInsumos = () => costeosapi.get('insumos').then((res) => res.data)
const postInsumos = (insumos) => costeosapi.post('insumos', insumos)
const putInsumos = (updated_insumos) =>
  costeosapi.put(`insumos/${updated_insumos.id}`, updated_insumos)
const deleteInsumos = (id) => costeosapi.delete(`insumos/${id}`)
const getUnidadesSelect = () =>
  getUnidades().then((data) =>
    data.map((uni) => ({ value: uni.id, label: uni.nombre }))
  )

export function Insumos() {
  // Inicializando react-query
  const queryClient = useQueryClient()
  // Inicializando el hook para el formulario
  const { register, handleSubmit, errors, reset, control } = useForm()

  // obteniendo datos de insumos
  const { isLoading, error, data } = useQuery('insumos', getInsumos)
  // creando mutacion para agregar insumos
  const postInsumosMut = useMutation(postInsumos, {
    onSuccess: () => {
      queryClient.invalidateQueries('insumos') // actualiza los datos de la tabla
      reset() // reseteando el formulario
    },
  })
  // creando mutación para actualizar insumos
  const putInsumosMut = useMutation(putInsumos) // No invalidar querys, porque el backend debe acatar lo que indique el frontend
  // creando mutación para borrar insumos
  const deleteInsumosMut = useMutation(deleteInsumos, {
    onSuccess: () => {
      queryClient.invalidateQueries('insumos') // actualiza los datos de la tabla
    },
  })
  // creando react-query para obtener unidades
  const unidades = useQuery('unidades', getUnidadesSelect)

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
        data: unidades.data,
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
    [unidades.data]
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

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="columns is-variable is-3">
      <div className="column">
        <div className="box">
          <GenericForm
            fields={fields}
            register={register}
            handleSubmit={handleSubmit}
            postMutation={postInsumosMut}
            errors={errors}
            control={control}
          />
        </div>
      </div>
      <div className="column">
        <BasicTable
          title="Insumos"
          cols={columns}
          data={data}
          money_column="valor_de_compra"
          update_callback={putInsumosMut.mutate}
          deleteData={deleteInsumosMut.mutate}
        />
      </div>
    </div>
  )
}
