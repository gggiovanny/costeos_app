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
import { useStringFormatter } from '../hooks/useStringFormatter'

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
  numeric_column, // custom prop passed
  isInEditMode, // indicate if the cell is in edit mode
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
    updateMyData(index, id, value)
    setIsEditing(false)
  }

  const onFocus = (e) => {
    setIsEditing(true)
    if (id == numeric_column) setValue(toFloat(value))
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const displayValue =
    id == numeric_column && !isEditing ? money.format(value) : value

  return (
    <>
      {!isInEditMode ? (
        <span>{displayValue}</span>
      ) : (
        <input
          value={displayValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          type={id == numeric_column && isEditing ? 'number' : 'text'}
        />
      )}
    </>
  )
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}

export function BasicTable({
  columns,
  data,
  numeric_column,
  updateMyData,
  skipPageReset,
}) {
  // Calculando total
  const { money } = useStringFormatter()
  const total = useMemo(() => {
    let _total = 0
    if (!numeric_column) return
    data.forEach((row) => {
      if (!numeric_column) return false
      _total += parseFloat(row[numeric_column])
    })
    return money.format(_total)
  }, [data])

  // Controla si las celdas se renderizan como inputs editables o de manera normal
  const [isInEditMode, setIsInEditMode] = useState(false)

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
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      numeric_column,
      isInEditMode,
    },
    useGlobalFilter,
    useSortBy
  )

  const onChangeEditMode = () => {
    setIsInEditMode(!isInEditMode)
  }

  return (
    <Panel
      title="Costos fijos"
      colorClass="is-pink"
      headerButton={
        <FiEdit
          className={isInEditMode && 'has-text-white'}
          onClick={onChangeEditMode}
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
        {total && (
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
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  numeric_column: PropTypes.string,
  updateMyData: PropTypes.func,
  skipPageReset: PropTypes.bool,
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
