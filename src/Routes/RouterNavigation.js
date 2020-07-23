import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

//Importando telas
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import Estoque from '../Pages/Estoque';
import Entrada from '../Pages/Entrada';
import UltimasEntradas from '../Pages/UltimasEntradas';
import Saida from '../Pages/Saida';

const RouterNavigation = (props) =>{

  return(
    <Router>
      <Switch>
        <Route exact authenticated={props.authenticated} path="/login" component={Login}/>
        <ProtectedRoute exact authenticated={props.authenticated} path="/" component={Dashboard}/>
        <ProtectedRoute exact authenticated={props.authenticated} path="/estoque" component={Estoque} />
        <ProtectedRoute exact authenticated={props.authenticated} path="/entrada" component={Entrada} />
        <ProtectedRoute exact authenticated={props.authenticated} path="/entradas" component={UltimasEntradas} />
        <ProtectedRoute exact authenticated={props.authenticated} path="/saida" component={Saida} />
      </Switch>
    </Router>
  );

}

export default RouterNavigation;