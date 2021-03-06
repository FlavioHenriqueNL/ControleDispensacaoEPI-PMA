import React, { useEffect, useState } from 'react';
import {Container} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

import Header from '../../Components/Header/Header';
import firebase from '../../Database/Connection';

import AcordeaoIO from '../../Components/AcordeaoIO';
import './style.scss';

export default function UltimasSaidas(){

  const [listaEntradas, setListaEntradas] = useState([]);
  const history = useHistory();

  useEffect(()=>{
    firebase.db.collection('movimentacoes').where('tipo', "==", "Entrada").get().then(
      snap => {
        let handleEntradas = [];
        snap.forEach(mov => {
          handleEntradas.push({
            id: mov.id,
            ubs: mov.data().ubs,
            data: mov.data().data,
            epis: mov.data().epis,
            entregador: mov.data().nome
          })
        });
        setListaEntradas(handleEntradas);
      }
    )
  },[])

  return(
    <>
      <Header/>
      <main id="ultimasSaidas">
        <Container>
          <header>
            <button onClick={() => history.push("/")}> Tela inicial</button>
            <h1>Ultimas Entradas</h1>
          </header>

        {listaEntradas.map( entrada => 
          <AcordeaoIO movimentacao={entrada} />
        )}

        </Container>
      </main>
    </>
  )
}