import React from "react";
import styled from "styled-components";
import { useTable } from "react-table";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

const Styles = styled.div`
  table {
    thead {
      tr:first-child {
        text-align: center;
      }
    }
  }
`;

export function TablaCostosFijos({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Costos Fijos",
        columns: [
          {
            Header: "Concepto",
            accessor: "concepto",
          },
          {
            Header: "Costo Mensual",
            accessor: "costo_mensual",
          },
        ],
      },
    ],
    []
  );

  return (
    <Styles>
      <TablaUI columns={columns} data={data} />
    </Styles>
  );
}

TablaCostosFijos.propTypes = {
  data: PropTypes.array.isRequired,
};

function TablaUI({ columns, data }) {
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
  });

  // Render the UI for your table
  return (
    <Table bordered hover {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
