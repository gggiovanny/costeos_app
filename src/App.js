import { Switch, Route } from 'react-router-dom'
import { MyNavbar } from './components/MyNavbar'
import { Home } from './pages/Home'
import { CostosFijos } from './pages/CostosFijos'
import { Unidades } from './pages/Unidades'
import { Insumos } from './pages/Insumos'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <MyNavbar />
      <div className="container is-widescreen mt-4">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/costos-fijos" component={CostosFijos} />
          <Route exact path="/unidades" component={Unidades} />
          <Route exact path="/insumos" component={Insumos} />
          <Route exact path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <ToastContainer position="bottom-center" pauseOnFocusLoss={false} />
    </>
  )
}

export default App
