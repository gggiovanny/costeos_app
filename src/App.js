import { Switch, Route } from 'react-router-dom'
import { MyNavbar } from './components/MyNavbar'
import { Home } from './pages/Home'
import { CostosFijos } from './pages/CostosFijos'
import { Unidades } from './pages/Unidades'
import { Insumos } from './pages/Insumos'
import { Recetas } from './pages/Recetas'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LoggedOnly } from './components/Login/LoggedOnly'

function App() {
  return (
    <>
      <LoggedOnly>
        <MyNavbar />
        <div className="mt-4">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/costos-fijos" component={CostosFijos} />
            <Route exact path="/unidades" component={Unidades} />
            <Route exact path="/insumos" component={Insumos} />
            <Route exact path="/recetas" component={Recetas} />
            <Route exact path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </LoggedOnly>
      <ToastContainer position="bottom-center" pauseOnFocusLoss={false} />
    </>
  )
}

export default App
