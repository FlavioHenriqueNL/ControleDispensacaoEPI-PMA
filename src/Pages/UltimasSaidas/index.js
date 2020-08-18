import React, { useEffect, useState } from 'react';
import {Container} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

import Header from '../../Components/Header/Header';
import firebase from '../../Database/Connection';

import AcordeaoIO from '../../Components/AcordeaoIO';
import './style.scss';

export default function UltimasSaidas(){

  const [listaSaidas, setListaSaidas] = useState([]);
  const history = useHistory();

  useEffect(()=>{
    firebase.db.collection('movimentacoes').where('tipo', "==", "Saída").get().then(
      snap => {
        let handleSaidas = [];
        snap.forEach(mov => {
          handleSaidas.push({
            id: mov.id,
            ubs: mov.data().ubs,
            data: mov.data().data,
            epis: mov.data().epis,
            entregador: mov.data().nome
          })
        });
        setListaSaidas(handleSaidas);
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
            <h1>Ultimas Saídas</h1>
          </header>

        {listaSaidas.map( saida => 
          <AcordeaoIO movimentacao={saida} />
        )}

        </Container>
      </main>
    </>
  )
}