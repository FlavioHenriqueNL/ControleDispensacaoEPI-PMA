import React,{useEffect, useState} from 'react';
import Firebase from '../../Database/Connection';
import {Link} from 'react-router-dom';
import {Container, Grid, TextField} from '@material-ui/core';
import moment from 'moment';

import Header from '../../Components/Header/Header';
import './style.css';

import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';

export default function Entrada(){
  const [motivo, setMotivo] = useState("");
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
      tipo: "Entrada",
      data: moment().format("DD/MM/YYYY"),
      epis: qtd,
      nome: usuario,
      motivo
    }).then(
      alert("Movimentação criada com sucesso.")
    ).catch(err => alert(err));
    
    entregarEpi(qtd);
  }

  function entregarEpi(qtd){

    let handleAdd = [...qtd];
    let handleEpi = [...epi];

    handleEpi.forEach( (handle, index) => {
      handle.quantidade += handleAdd[index].quantidade;
    });
    setNewEpi(handleEpi);      

    handleEpi.map(item => {
      Firebase.db.collection("epi").doc(item.id).set({
        nome: item.nome,
        quantidade: item.quantidade
      });
    });

    alert("Entrada realizada com sucesso!");
  }

  const registrarSaida = (e) =>{
    e.preventDefault();
    addMovimentacao(addEpi);
  }

  return(
    
    <main id="entradaestoque">
      <Header/>
      <Container>
        <Grid container direction="row" className="cabecalho-secao" alignItems="center">
          <Grid  className="link-inicial-container" sm={2}><Link className="link-inicial" to="/"><HomeIcon/> Página Inicial </Link></Grid>
          <Grid sm={12}><h1>Entrada de Estoque de EPI</h1></Grid>
          <Grid  className="link-ultimas-container" sm={2}><Link className="link-ultimas" to="/entradas"><ListAltIcon/> Ultimas Entradas</Link></Grid>
        </Grid>

        <Grid container className="cabecalho-entrada-saida" direction="row" justify="center" alignItems="center">
          <Grid className="info-geral" xs={6}>
            <p>Data: <span>{moment().format("DD/MM/YYYY")}</span></p>
            <p>Dispensador: <span>{usuario}</span> </p>
          </Grid>
          <Grid xs={6}>
            <TextField fullWidth onChange={(e)=>setMotivo(e.target.value)} id="outlined-basic" label="Motivo" variant="outlined" />
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
                  <td><input class="qtdAdicionar" type="number" id={epi.nome} min="0"  onChange={updateFieldChanged(index)} /></td>
                </tr>
                )
              }
            </tbody>
          </table>
          <input className="btn-adicionar" type="submit" value="Adicionar"/>
        </form>
      </Container>
    </main>
  )
}