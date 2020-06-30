import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { MyNavbar } from './components/navbar'
import { Home } from './pages/home'
import { CostosFijos } from './pages/costos_fijos'
import { About } from './pages/about'
import { NotFound } from './pages/not_found'

const ContentDiv = styled.div`
  padding: 1rem;
`

function App() {
  return (
    <div>
      <MyNavbar />
      <ContentDiv>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/costos-fijos' component={CostosFijos} />
          <Route exact path='/about' component={About} />
          <Route component={NotFound} />
        </Switch>
      </ContentDiv>
    </div>
  );
}

export default App;
