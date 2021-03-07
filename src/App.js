import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { MyNavbar } from './components/MyNavbar'
import { Home } from './pages/Home'
import { CostosFijos } from './pages/CostosFijos'
import { Unidades } from './pages/Unidades'
import { Insumos } from './pages/Insumos'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  return (
    <>
      <MyNavbar />
      <div className="container mt-4">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/costos-fijos" component={CostosFijos} />
          <Route exact path="/unidades" component={Unidades} />
          <Route exact path="/insumos" component={Insumos} />
          <Route exact path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default App
