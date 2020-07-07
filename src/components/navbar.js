import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const MyNavbar = () => {
  const [isActive, setIsActive] = useState(false)
  let togleActive = () => { setIsActive(!isActive) }
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to='/' className="navbar-item">
          <h1 className='title'>
            Costeapp
          </h1>
        </Link>
        <span role="button" onClick={togleActive} className={`navbar-burger burger ${isActive && 'is-active'}`} aria-label="menu" aria-expanded="false" data-target="mainNavbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>
      <div id="mainNavbar" className={`navbar-menu ${isActive && 'is-active'}`}>
        <div className="navbar-start">
          <Link className="navbar-item" to="/costos-fijos">Costos fijos</Link>
          <Link className="navbar-item" to="/insumos">Insumos</Link>
          <Link className="navbar-item" to="/recetas">Recetas</Link>
          <Link className="navbar-item" to="/reporte">Reporte</Link>
        </div>
        <div className="navbar-end">
        <Link to='/about' className="navbar-item">
            Acerca de
          </Link>
        </div>
      </div>
    </nav>
  )
}
