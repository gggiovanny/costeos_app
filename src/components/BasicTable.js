import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table'
import { Panel } from '../components/Panel'
import { FiSearch } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import { useStringFormatter } from '../hooks/useStringFormatter'

const default_rxdb_update_callback = async (id, value, original) => {
  let updatedfield = {}
  updatedfield[id] = value
  await original.update({
    $set: updatedfield,
  })
}

const default_rxdb_delete_callback = (todelete) => {
  todelete.remove()
}

const EditableCell = ({
  value: initialValue,
  row: { index, original },
  column: { id },
  updateCallback, // This is a custom function that we supplied to our table instance
  money_column, // custom prop passed
  isInEditMode, // indicate if the cell is in edit mode
  column: { show_normal_callback, show_editing_callback },
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)
  // Para llevar control de si el campo esta siendo editado
  const [isEditing, setIsEditing] = React.useState(false)
  // hook para dar formato a los campos de las tablas
  const { money, toFloat } = useStringFormatter()

  const onChange = (e) => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateCallback(id, value, original)
    setIsEditing(false)
  }

  const onFocus = (e) => {
    setIsEditing(true)
    if (id === money_column) setValue(toFloat(value))
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  show_editing_callback = show_editing_callback || ((item) => item)
  show_normal_callback = show_normal_callback || ((item) => item)

  let displayValue = isEditing
    ? show_editing_callback(value, original)
    : show_normal_callback(value, original)

  displayValue =
    id === money_column && !isEditing ? money.format(value) : displayValue

  return (
    <>
      {!isInEditMode ? (
        <span>{displayValue}</span>
      ) : (
        <input
          className="input"
          value={displayValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          type={id === money_column && isEditing ? 'number' : 'text'}
        />
      )}
    </>
  )
}

const ButtonDelete = ({ row, deleteData, isInEditMode }) => {
  return isInEditMode ? (
    <MdDeleteForever
      className="has-text-danger"
      onClick={() => {
        deleteData(row.original)
      }}
      style={{ cursor: 'pointer' }}
      size={32}
    />
  ) : (
    ''
  )
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}

export function BasicTable({
  title,
  cols,
  data,
  money_column,
  showTotal,
  update_callback,
  deleteData,
  rxdbMode = false,
}) {
  // Calculando total
  const { money } = useStringFormatter()
  const total = useMemo(() => {
    let _total = 0
    if (!money_column) return money.format(_total)
    data.forEach((row) => {
      _total += parseFloat(row[money_column])
    })
    return money.format(_total || 0)
  }, [data, money, money_column])

  // Controla si las celdas se renderizan como inputs editables o de manera normal
  const [isInEditMode, setIsInEditMode] = useState(false)

  const columns = useMemo(
    () => [
      ...cols,
      {
        Header: '',
        accessor: 'delete',
        Cell: ButtonDelete,
      },
    ],
    [cols]
  )

  // si se activo rxdbMode, poner los callbacks para editar y eliminar por defecto
  if (rxdbMode) {
    // si la funcion está definida explicitamente, conservarla, si no, usar las default
    update_callback = update_callback || default_rxdb_update_callback
    deleteData = deleteData || default_rxdb_delete_callback
  }

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const [skipPageReset, setSkipPageReset] = React.useState(false)
  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data])
  // When our cell renderer calls update_callback, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateCallback = (...args) => {
    // We also turn on the flag to not reset the page
    update_callback(...args)
    setSkipPageReset(true)
  }

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // update_callback isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateCallback,
      deleteData,
      money_column,
      isInEditMode,
    },
    useGlobalFilter,
    useSortBy
  )

  return (
    <Panel
      title={title}
      colorClass="is-pink"
      headerButton={
        <FiEdit
          className={isInEditMode && 'has-text-white'}
          onClick={() => {
            setIsInEditMode(!isInEditMode)
          }}
          style={{ cursor: 'pointer' }}
        />
      }
    >
      <GlobalFilterInput
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table className="table is-fullwidth is-hoverable" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting.
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        {showTotal && (
          <tfoot>
            <tr>
              <td className="is-size-5 px-3 has-text-weight-bold">Total</td>
              <td className="is-size-5 px-3 has-text-weight-bold">{total}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </Panel>
  )
}

BasicTable.propTypes = {
  title: PropTypes.string.isRequired,
  cols: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  money_column: PropTypes.string,
  showTotal: PropTypes.bool,
  update_callback: PropTypes.func,
  deleteData: PropTypes.func,
  rxdbMode: PropTypes.bool,
}

function GlobalFilterInput({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <p className="control has-icons-left">
      <input
        className="input is-fullwidth"
        type="search"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`Buscar entre ${count} registros...`}
        style={{
          border: '0',
        }}
      />
      <span className="icon is-left">
        <FiSearch />
      </span>
    </p>
  )
}
