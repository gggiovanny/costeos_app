import React from 'react'
import { GenericForm } from '../components/GenericForm'
import { useForm } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import { insumos_actions } from '../providers/actions'
import { BasicTable } from '../components/BasicTable'
import { GiMeat } from 'react-icons/gi'
import { MdAttachMoney } from 'react-icons/md'
import { AiOutlineNumber } from 'react-icons/ai'
import { AiFillTag } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'


export function Insumos() {
  // Inicializando el manejador global del state para agregar y editar elementos
  const {
    action,
    state: { insumos },
  } = useStateMachine(insumos_actions)
  // Inicializando el hook para el formulario
  const { register, handleSubmit, errors, reset } = useForm()
  // lambda usado por el formulario para agregar datos al state de la tabla
  const addData = (data) => {
    action({ addRow: data })
    reset()
  }
  const fields = React.useMemo(
    () => [
      {
        title: 'Insumo',
        name: 'insumo',
        type: 'text',
        icon: <GiMeat />,
      },
      {
        title: 'Valor de compra',
        name: 'valor_de_compra',
        type: 'number',
        icon: <MdAttachMoney />,
      },
      {
        title: 'Cantidad',
        name: 'cantidad',
        type: 'number',
        icon: <AiOutlineNumber />,
      },
      {
        title: 'Unidad',
        name: 'unidad',
        type: 'text',
        icon: <AiFillTag />,
      },
      {
        title: 'Merma',
        name: 'merma',
        type: 'number',
        icon: <FaTrashAlt />,
      },
    ],
    []
  )

  // Definiendo columnas de la tabla
  const columns = React.useMemo(
    () => [
      {
        Header: 'Insumo',
        accessor: 'insumo',
      },
      {
        Header: 'Valor de compra',
        accessor: 'valor_de_compra',
      },
      {
        Header: 'Cantidad',
        accessor: 'cantidad',
      },
      {
        Header: 'Unidad',
        accessor: 'unidad',
      },
      {
        Header: 'Merma',
        accessor: 'merma',
      },
    ],
    []
  )

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false)
  }, [insumos])

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

  // lambda usado por la tabla para eliminar datos al state de la tabla
  const deleteData = (row) => {
    action({ deleteRow: row.id })
  }
  console.log(insumos)

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
      <div className="column">
        <BasicTable
          title="Insumos"
          cols={columns}
          data={insumos}
          money_column="valor_de_compra"
          updateMyData={updateMyData}
          deleteData={deleteData}
          skipPageReset={skipPageReset}
        />
      </div>
    </div>
  )
}
