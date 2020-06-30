import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export const CostosFijos = () =>{
  const columns = React.useMemo(
    () => [
      {
        Header: 'Costos Fijos',
        columns: [
          {
            Header: 'Concepto',
            accessor: 'concepto',
          },
          {
            Header: 'Costo Mensual',
            accessor: 'costo_mensual',
          },
        ],
      },
    ],
    []
  )

  
  const data = [
    { concepto: "Nomina", costo_mensual: "2,000.00" },
    { concepto: "Pago de luz", costo_mensual: "500.00" },
    { concepto: "Pago de agua", costo_mensual: "250.00" },
    { concepto: "Gas", costo_mensual: "2,000.00" },
    { concepto: "Alquiler", costo_mensual: "3,000.00" },
  ]

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}
