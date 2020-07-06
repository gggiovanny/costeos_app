import React, { useState } from "react";
import styled from "styled-components";
import { TablaCostosFijos } from "../components/tabla_costos_fijos";
import { FormCostosFijos } from "../components/form_costos_fijos";
import { FloatingButton } from "../components/floating_button";
import { useForm } from "react-hook-form";

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

  const { register, handleSubmit, errors } = useForm();
  const addData = (data) => {
    console.log(data);
    setCostosFijos([
      ...costosFijos,
      data,
    ]);
  };

  return (
    <Styles>
      <FormCostosFijos
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={addData}
        errors={errors}
      />
      <TablaCostosFijos data={costosFijos} />
      <FloatingButton onClick={addData} />
    </Styles>
  );
}
