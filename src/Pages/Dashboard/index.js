import React,{useEffect} from 'react';
import Firebase from '../../Database/Connection';
import {Link} from 'react-router-dom';
import Header from '../../Components/Header/Header';
import {Container, Grid} from '@material-ui/core';

import StorageIcon from '@material-ui/icons/Storage';

import "../../Assets/css/style.css";
import "./style.css";

const Dashboard = () => {
  return(
    <>
    <Header/>

    <main className="dashboard">
      <Container>
        <h1>Controle de dispensação de EPI'S</h1>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Link to="/estoque" className="link">Estoque atual</Link>
          </Grid>
          <Grid item xs={4}>
            <Link to="/entrada" className="link">Entrada de estoque</Link>
          </Grid>
          <Grid item xs={4}>
            <Link to="/saida" className="link">Entregar EPI</Link>
          </Grid>
          <Grid item xs={4}>
            <Link to="/entradas" className="link">Ultimas Entradas</Link>
          </Grid>
          <Grid item xs={4}>
            <Link to="/saidas" className="link">Ultimas Saídas</Link>
          </Grid>
        </Grid>
        
      </Container>      
    </main>
  </>
  );

}
  


export default Dashboard;