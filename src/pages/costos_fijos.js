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
    { concepto: "Nomina", costo_mensual: 2000 },
    { concepto: "Pago de luz", costo_mensual: 500 },
    { concepto: "Pago de agua", costo_mensual: 250 },
    { concepto: "Gas", costo_mensual: 2000 },
    { concepto: "Alquiler", costo_mensual: 3000 },
  ];

  const [costosFijos, setCostosFijos] = useState(data);

  const { register, handleSubmit, errors, reset } = useForm();
  const addData = (data) => {
    setCostosFijos([
      ...costosFijos,
      data,
    ]);
    reset()
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
      {/* <FloatingButton onClick={addData} /> */}
    </Styles>
  );
}
