import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../../Components/Header/Header';
import {Container, Grid} from '@material-ui/core';

import "../../Assets/css/style.css";
import "./style.css";

const Dashboard = () => {
  return(
    <>
    <Header/>

    <main className="dashboard">
      <Container>
        <h1>Controle de dispensação de EPI'S</h1>
        <Grid container justify="center" spacing={3}>
          <Grid item md={4} sm={6} xs={12} >
            <Link to="/estoque" className="link">Estoque atual</Link>
          </Grid>
          <Grid item md={4} sm={6} xs={12} >
            <Link to="/saida" className="link">Entregar EPI</Link>
          </Grid>
          <Grid item md={4} sm={6} xs={12} >
            <Link to="/entrada" className="link">Entrada de estoque</Link>
          </Grid>
          <Grid item md={4} sm={6} xs={12} >
            <Link to="/entradas" className="link">Ultimas Entradas</Link>
          </Grid>
          <Grid item md={4} sm={6} xs={12} >
            <Link to="/saidas" className="link">Ultimas Saídas</Link>
          </Grid>
        </Grid>
      </Container>      
    </main>
  </>
  );
}
export default Dashboard;