import React, { Component } from 'react'

export class About extends Component {
  render() {
    return (
      <div>
        <h1 className="title">Acerca de</h1>
        <p>
          App creada por Giovanny González Baltazar usando las ideas de Kora
          Amaya Valdéz.
        </p>
        <p>
          Favicon creado por{' '}
          <a href="https://www.flaticon.com/authors/iconixar">iconixar</a> en{' '}
          <a href="https://www.flaticon.com/free-icon/chef_2413311?term=recipe&page=1&position=20&page=1&position=20&related_id=2413311">
            flaticon.com
          </a>
        </p>
      </div>
    )
  }
}
