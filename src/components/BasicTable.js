import React from 'react'
import PropTypes from 'prop-types'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table'
import { Panel } from '../components/Panel'
import { FiSearch } from 'react-icons/fi'

export function BasicTable({ columns, data, total }) {
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
  total: PropTypes.string,
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
