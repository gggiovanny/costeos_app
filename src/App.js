import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { MyNavbar } from './components/MyNavbar'
import { Home } from './pages/Home'
import { CostosFijos } from './pages/CostosFijos'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'
import costos_fijos from './providers/models/costos_fijos'
import { DevTool } from 'little-state-machine-devtools'
import {
  StateMachineProvider,
  createStore,
  setStorageType,
} from 'little-state-machine'

setStorageType(window.localStorage)
createStore({
  costos_fijos,
})

const ContentDiv = styled.div`
  padding: 1rem;
`

function App() {
  return (
    <div>
      <MyNavbar />
      <StateMachineProvider>
        <DevTool />
        <ContentDiv>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/costos-fijos" component={CostosFijos} />
            <Route exact path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </ContentDiv>
      </StateMachineProvider>
    </div>
  )
}

export default App
