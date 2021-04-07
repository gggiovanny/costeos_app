import { FormWrapper } from '../components/Forms/FormWrapper'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FieldInput } from '../components/Forms/Fields/FieldInput'
import { FieldSelect } from '../components/Forms/Fields/FieldSelect'
import { FaClipboardList } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'

export function Recetas() {
  // Inicializando el hook para el formulario
  const formProps = useForm()
  // Campos del formulario
  const fields = React.useMemo(
    () => [
      {
        title: 'Costo mensual',
        name: 'costo_mensual',
        type: 'number',
        allowDecimals: true,
        icon: <MdAttachMoney />,
      },
    ],
    []
  )

  return (
    <div className="columns is-variable is-3">
      <div className="column column is-two-thirds">
        <div className="box">
          <FormWrapper {...formProps} onSubmit={(data) => console.log(data)}>
            <FieldInput
              title="Concepto"
              name="concepto"
              type="text"
              icon={<FaClipboardList />}
            />
            <FieldSelect
              title="xd"
              name="xd"
              data={[
                { value: 1, label: 'UNO' },
                { value: 2, label: 'DOS' },
                { value: 3, label: 'TRES' },
              ]}
            />
          </FormWrapper>
        </div>
      </div>
    </div>
  )
}
