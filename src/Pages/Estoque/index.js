import React,{useEffect, useState} from 'react';
import Firebase from '../../Database/Connection';
import Header from '../../Components/Header/Header';
import {Link} from 'react-router-dom';

import {Container, Grid} from '@material-ui/core';
import './style.css';

const Estoque = () => {

  const [lista, setListaEpis] = useState([]);
  useEffect(()=>{
    if(lista.length === 0){
      Firebase.db.collection("epi").get().then(
        snap => {
          const listaEpi = [];
          snap.forEach(
            doc => {
              //console.log(doc);
              listaEpi.push({
                id: doc.id,
                nome: doc.data().nome,
                quantidade: parseInt(doc.data().quantidade),
              })    
            }
          );
          setListaEpis(listaEpi);
          console.log("Consulta realizada. Retorno pelo Firebase");
        }, err => console.log(err)
      );
    }
  },[lista.length])

  return(
    <main id="estoqueatual">
      <Header/>
      <Container>

        <h1>Estoque Atual</h1>
        <table className="tableEstoque">
          <thead>
            <tr>
              <td id="nome">EPI</td>
              <td id="quantidade">Quantidade em Estoque</td>
              <td id="Situação">Situação</td>
            </tr>
          </thead>
        
          <tbody>
            {
              lista.map((epi) =>
                <tr key={epi.id}>
                  <td>{epi.nome}</td>
                  <td>{epi.quantidade}</td>
                  {epi.quantidade <= 20 ? <td>Quantidade Baixa</td>:<td>Nivel normal</td>}     
                </tr>
              )
            }
          </tbody>
        </table>
        
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Link to="/saida" className="link">Entregar EPI</Link>
          </Grid>
          <Grid item xs={6}>
            <Link to="/entrada" className="link">Entrada de estoque</Link>
          </Grid>
        </Grid>

      </Container>
    </main>
  );
}

export default Estoque;