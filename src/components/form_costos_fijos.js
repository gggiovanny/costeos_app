import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

export function FormCostosFijos({register, handleSubmit, onSubmit, errors}) {

  

  return (
    <div className="box">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Concepto</label>
          <div className="control has-icons-left">
            <input
              ref={register({ required: true })}
              className="input"
              name="concepto"
              type="text"
              placeholder="Concepto"
            />
            <span className="icon is-small is-left">
              <FaClipboardList />
            </span>
          </div>
          {errors.concepto && <p className="help is-danger">Falta agregar un concepto</p>}
        </div>

        <div className="field">
          <label className="label">Costo mensual</label>
          <div className="control has-icons-left">
            <input
              ref={register({ required: true })}
              className="input"
              name="costo_mensual"
              type="number"
              placeholder="Costo mensual"
            />
            <span className="icon is-small is-left">
              <MdAttachMoney />
            </span>
          </div>
          {errors.costo_mensual && <p className="help is-danger">Falta agregar un costo mensual</p>}
        </div>

        <div className="container">
          <input className="button is-success" type="submit" value="Agregar" />
        </div>
      </form>
    </div>
  );
}
