import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { MyNavbar } from './components/MyNavbar'
import { Home } from './pages/Home'
import { CostosFijos } from './pages/CostosFijos'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'

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
