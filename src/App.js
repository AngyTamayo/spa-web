import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Components/Menu/Navbar'
import Productos from './Pages/Productos';
import Servicios from './Pages/Servicios';
import Usuarios from './Pages/Usuarios';
import Inventarios from './Pages/Inventarios';
import Empleados from './Pages/Empleados';
import Home from './Pages/Home';
import Inicio from './Pages/Inicio';
import Distribuidores from './Pages/Distribuidores';
import Reservas from './Pages/Reservas';
import Pqr from './Pages/Pqr';
import Compras from './Pages/Compras';
import Comidas from './Pages/Comidas';
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Inicio} />
        <Route path='/home' exact component ={Home}/>
        <Route path='/usuarios' exact component={Usuarios} />
        <Route path='/servicios' exact component={Servicios} />
        <Route path='/productos' exact component={Productos} />
        <Route path='/inventarios' exact component={Inventarios} />
        <Route path='/empleados' exact component={Empleados} />
        <Route path='/distribuidores' exact component={Distribuidores} />
        <Route path='/reservas' exact component={Reservas} />
        <Route path='/pqr' exact component={Pqr} />
        <Route path='/compras' exact component={Compras} />
        <Route path='/comidas' exact component={Comidas} />
      </Switch>

    </Router>
  );
}

export default App;
