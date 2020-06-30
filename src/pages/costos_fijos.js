import React, { useState } from "react";
import styled from "styled-components";
import { TablaCostosFijos } from "../components/tabla_costos_fijos";
import { FloatingButton } from "../components/floating_button";

const Styles = styled.div`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export function CostosFijos() {
  const data = [
    { concepto: "Nomina", costo_mensual: "2,000.00" },
    { concepto: "Pago de luz", costo_mensual: "500.00" },
    { concepto: "Pago de agua", costo_mensual: "250.00" },
    { concepto: "Gas", costo_mensual: "2,000.00" },
    { concepto: "Alquiler", costo_mensual: "3,000.00" },
  ];

  const [costosFijos, setCostosFijos] = useState(data);

  const addData = () => {
    setCostosFijos([
      ...costosFijos,
      { concepto: "Gas", costo_mensual: "2,000.00" }
    ])
    
  }
  return (
    <Styles>
      <TablaCostosFijos data={costosFijos} />
      <FloatingButton onClick={addData} />
    </Styles>
  );
}
