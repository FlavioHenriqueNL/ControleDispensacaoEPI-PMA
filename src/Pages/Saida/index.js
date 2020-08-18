import React,{useEffect, useState} from 'react';
import Firebase from '../../Database/Connection';
import {Link} from 'react-router-dom';
import {Container, Grid, TextField} from '@material-ui/core';
import moment from 'moment';

import Header from '../../Components/Header/Header';

export default function Saida(){
  const [ubs, setUbs] = useState("");
  const [usuario, setUsuario] = useState("");
  const [epi, setEpi] = useState([]);
  const [addEpi, setAddEpi] = useState(epi);
  const [newEpi, setNewEpi] = useState([]);

  useEffect(()=>{
    setUsuario(localStorage.getItem('nomeUsuario'));
    
    Firebase.db.collection("epi").get().then(
      snap => {
        let handleEpi = [];
        let handleAddEpi = [];
        snap.forEach(
          doc => {
            handleEpi.push({
              id: doc.id,
              nome: doc.data().nome,
              quantidade: parseInt(doc.data().quantidade),
            }) 
          }
        );
        snap.forEach(
          doc => {
            handleAddEpi.push({
              id: doc.id,
              nome: doc.data().nome,
              quantidade: 0,
            }) 
          }
        );
        setEpi(handleEpi);        
        setAddEpi(handleAddEpi);
      }, err => console.log(err)
    );
  },[]);

  const updateFieldChanged = index => e => {    
    let fieldValue = parseInt(e.target.value);
    let fieldIndex = index;

    let handleAddEpi = [...addEpi];
    handleAddEpi[fieldIndex].quantidade = fieldValue;
    setAddEpi(handleAddEpi); 
  }
  
  async function addMovimentacao(qtd){
   await Firebase.db.collection("movimentacoes").add({
      tipo: "Saída",
      ubs: ubs,
      data: moment().format("L"),
      epis: qtd,
      nome: usuario
    }).then(
      alert("Movimentação criada com sucesso.")
    ).catch(err => alert(err));
    
    entregarEpi(qtd);
  }

  function entregarEpi(qtd){

    let handleAdd = [...qtd];
    let handleEpi = [...epi];

    handleEpi.forEach( (handle, index) => {
      handle.quantidade -= handleAdd[index].quantidade;
    });
    setNewEpi(handleEpi);      

    handleEpi.map(item => {
      Firebase.db.collection("epi").doc(item.id).set({
        nome: item.nome,
        quantidade: item.quantidade
      });
    });

    alert("Entrega realizada com sucesso!");
  }

  const registrarSaida = (e) =>{
    e.preventDefault();
    addMovimentacao(addEpi);
  }

  return(
    
    <main id="entradadeestoque">
      <Header/>
      <Container>
        <Grid container direction="row" alignItems="center">
          <Grid sm={2}><Link to="/">Ir para tela inicial</Link></Grid>
          <Grid sm={10}><h1>Entregar EPI</h1></Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid xs={6}>
            <h1>Data: {moment().format("L")}</h1>
          </Grid>
          <Grid xs={6}>
            <TextField fullWidth onChange={(e)=>setUbs(e.target.value)} id="outlined-basic" label="Unidade de Saúde" variant="outlined" />
          </Grid>
        </Grid>
          
        <form onSubmit={registrarSaida}>
          <table class="tableEstoque">
            <thead>
              <tr>
                <th>Nome do EPI</th>
                <th>Estoque atual</th>
                <th>Quantidade a entregar</th>
              </tr>
            </thead>
            <tbody>
              {
                epi.map((epi, index) => 
                <tr key={epi.id} >
                  <td>{epi.nome}</td>
                  <td>{epi.quantidade}</td>
                  <td><input class="qtdAdicionar" type="number" id={epi.nome} min="0" max={epi.quantidade} onChange={updateFieldChanged(index)} /></td>
                </tr>
                )
              }
            </tbody>
          </table>
          <input className="btn-adicionar" type="submit" value="Entregar"/>
        </form>
      </Container>
    </main>
  )
}