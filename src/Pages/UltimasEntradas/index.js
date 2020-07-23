import React, {useState, useEffect} from 'react';
import Firebase from '../../Database/Connection';

import Header from '../../Components/Header/Header';

import VisualizarEntrada from './VisualizarEntrada'

const UltimasEntradas = () => {

  const [entradas,setEntradas] = useState([]);

  useEffect(()=>{
    console.log("Antes da query");
    Firebase.db.collection("movimentacoes").where("tipo", "==", "Entrada").get().then(
      snap =>{
        let movimentacao = [];
        snap.forEach(
          mov =>{
            movimentacao.push({
              id: mov.id,
              data: mov.data().data,
              epis: mov.data().epis,
              usuario: mov.data().usuario
            })
          }
        )
        setEntradas(movimentacao);
      }
    )
  }, [])

  return(
    <>
      <Header/>
      <main id="UltimasEntradas">
        <table>
          <thead>
            <tr>
              <th>Cod. Id. Entrada</th>
              <th>Data</th>
              <th>Dispensador</th>
              <th>Visualizar</th>
            </tr>
          </thead>
          <tbody>
            {
              entradas.map(item => 
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.data}</td>
                  <td>{item.usuario}</td>
                  <td><VisualizarEntrada parametro={item}/></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </main>
    </>
  );

}
export default UltimasEntradas;