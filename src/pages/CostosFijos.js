import React, { useMemo, useEffect, useState } from 'react'
import { GenericForm } from '../components/GenericForm'
import { BasicTable } from '../components/BasicTable'
import { useForm } from 'react-hook-form'
import { FaClipboardList } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'
import * as Database from '../providers/RxDB/Database'
import { toast } from 'react-toastify'

const subs = []

const editCostoFijo = (costofijo) => console.log(costofijo)
const deleteCostoFijo = (costofijo) => console.log(costofijo)

export function CostosFijos() {
  // Inicializando el hook para el formulario
  const { register, handleSubmit, errors, reset } = useForm()

  // obteniendo datos de costos fijos
  const [costosfijos, setCostosfijos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const db = await Database.get()
      const sub = db.costosfijos
        .find({
          selector: {},
          sort: [{ concepto: 'asc' }],
        })
        .$.subscribe((data) => {
          console.log('Actualizando... CostosFijos.js ~ line 20 ~ data', data)
          if (!data) return
          setCostosfijos(data)
          setIsLoading(false)
        })
      subs.push(sub)
    })()
    return () => {
      subs.forEach((sub) => sub.unsubscribe())
    }
  }, [])

  //
  const addCostoFijo = async (costofijo) => {
    console.log('🚀 ~ file: CostosFijos.js ~ line 52 ~ costofijo', costofijo)
    const db = await Database.get()
    try {
      await db.costosfijos.insert(costofijo)
    } catch (error) {
      toast.error(`Ya existe un registro para '${error.parameters.id}'`)
    }
    reset()
  }

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
          update_callback={editCostoFijo}
          deleteData={deleteCostoFijo}
        />
      </div>
    </div>
  )
}
