import React from 'react'
import { FaClipboardList } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'
import { FieldInput } from './FieldInput'

export function FormCostosFijos({ register, handleSubmit, onSubmit, errors }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldInput
        inputRef={register({ required: true })}
        title="Concepto"
        name="concepto"
        type="text"
        placeholder="Concepto"
        icon={<FaClipboardList />}
        showError={errors.concepto}
      />

      <FieldInput
        inputRef={register({ required: true })}
        title="Costo mensual"
        name="costo_mensual"
        type="number"
        placeholder="Costo mensual"
        icon={<MdAttachMoney />}
        showError={errors.costo_mensual}
      />
      <input className="button is-success is-fullwidth" type="submit" value="Agregar" />
    </form>
  )
}
