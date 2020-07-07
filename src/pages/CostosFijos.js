import React from 'react'
import styled from 'styled-components'
import { TablaCostosFijos } from '../components/TablaCostosFijos'
import { FormCostosFijos } from '../components/form_costos_fijos'
import { FloatingButton } from '../components/FloatingButton'
import { useForm } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import { addCostoFijo } from '../providers/actions'

const Styles = styled.div`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

export function CostosFijos() {
  const {
    action,
    state: { costos_fijos },
  } = useStateMachine(addCostoFijo)
  const { register, handleSubmit, errors, reset } = useForm()

  const addData = (data) => {
    console.log(data)
    action(data)
    reset()
  }

  return (
    <Styles>
      <FormCostosFijos
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={addData}
        errors={errors}
      />
      <TablaCostosFijos data={costos_fijos} />
      {/* <FloatingButton onClick={addData} /> */}
    </Styles>
  )
}
