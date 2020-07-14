import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table'
import { Panel } from '../components/Panel'
import { FiSearch } from 'react-icons/fi'
import { useStringFormatter } from '../hooks/useStringFormatter'

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
  numeric_column, // custom prop passed
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)
  // hook para dar formato a los campos de las tablas
  const { money, toFloat } = useStringFormatter()

  // Cell: (props) => money.format(props.value),

  const onChange = (e) => {
    console.log(e.target.value, toFloat(e.target.value))
    if (id == numeric_column) setValue(toFloat(e.target.value))
    else setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  const onFocus = (e) => {
    console.log(numeric_column, id, e.target.value, toFloat(e.target.value))
    if (id == numeric_column) setValue(toFloat(e.target.value))
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <input
      value={id == numeric_column ? money.format(value) : value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
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
    },
    useGlobalFilter,
    useSortBy
  )

  return (
    <Panel title="Costos fijos" colorClass="is-pink">
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
