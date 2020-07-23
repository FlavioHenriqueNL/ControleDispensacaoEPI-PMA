import React, {useEffect, useState} from 'react';
import Firebase from '../../Database/Connection';
import moment from 'moment';
import {useHistory, Link} from 'react-router-dom';
import Header from '../../Components/Header/Header';
import {Container, Grid} from '@material-ui/core';
import './style.css';

const HomeButton = () => {
  let history = useHistory();

  function handleClick(){
    history.push("/");
  }
  return(
    <button className="telainicial" type="button" onClick={handleClick}>
      Ir para tela inicial
    </button>
  )
}

export default class EntradaNew extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      epi: [],
      addEpi: [],
      novoEpi: [],
     
    }
    this.updateFieldChanged = this.updateFieldChanged.bind(this);
    this.adicionarEpi = this.adicionarEpi.bind(this);
  }

  componentWillMount(){
    Firebase.db.collection("epi").get().then(
      snap => {
        let s = this.state;
        snap.forEach(
          doc => {
            s.epi.push({
              id: doc.id,
              nome: doc.data().nome,
              quantidade: parseInt(doc.data().quantidade),
            }) 
          }
        );
        this.setState(s);
        this.setState({addEpi: this.state.epi});
        console.log("Retorno concluido.");
        
      }, err => console.log(err)
    );  
  }
  async componentDidMount(){
    var s = this.state;
    Firebase.auth.onAuthStateChanged(logged => {
      Firebase.db.collection("usuarios").doc(logged.uid).get().then(
      
        doc => {
          s.nome = doc.data().nome;
          console.log(s.nome);
          this.setState({nome: s.nome});
        }
      )
    })
    
  }

  updateFieldChanged = index => e => {    
    let fieldValue = parseInt(e.target.value);
    let fieldIndex = index;
    console.log("Field Value:" + fieldValue);

    this.setState(prevState => ({
      addEpi: prevState.addEpi.map(
        (el, index) => index === fieldIndex ? { ...el, quantidade: fieldValue }: el
      )
    }));
    
  }

  adicionarEpi = e => {
    e.preventDefault();
    let s = this.state;

    for(let i = 0; i<this.state.epi.length; i++){
      console.log(s.epi[i].quantidade + "Quantidade de existente");
      console.log(s.addEpi[i].quantidade + "Quantidade adicionada");
      console.log(s.epi[i].quantidade + s.addEpi[i].quantidade + " : Quantidade resultante." )
      
      s.novoEpi.push({
        id: s.epi[i].id,
        nome: s.epi[i].nome,
        quantidade: s.epi[i].quantidade + s.addEpi[i].quantidade
      });
    }
    this.setState(s);

    this.state.novoEpi.map(item => {
      console.log("ID: "+ item.id);
      console.log("nome: "+ item.nome);
      console.log("quantidade: "+ item.quantidade);
      Firebase.db.collection("epi").doc(item.id).set({
        nome: item.nome,
        quantidade: item.quantidade
      });
    });
    
    moment.locale();
    Firebase.db.collection("movimentacoes").add({
      tipo: "Entrada",
      data: moment().format('L'),
      epis: this.state.addEpi,
      nome: this.state.nome
    }).catch( err => alert("Algo de errado não deu certo."));

    alert("Adicionado com suceso!");
    this.setState({epi: this.state.novoEpi});
  }

  render(){
    return(
      <main id="entradadeestoque">
        <Header/>
        <Container>
          <Grid>
            <HomeButton/>
            <h1>Adicionar Estoque</h1>
          </Grid>
            
          <form onSubmit={this.adicionarEpi}>
            <table class="tableEstoque" >
              <thead>
                <tr>
                  <th>Nome do EPI</th>
                  <th>Estoque atual</th>
                  <th>Quantidade a adicionar</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.epi.map((epi, index) => 
                  <tr key={epi.id} >
                    <td>{epi.nome}</td>
                    <td>{epi.quantidade}</td>
                    <td><input class="qtdAdicionar" type="number" id={epi.nome} min="0" onChange={this.updateFieldChanged(index)} /></td>
                  </tr>

                  )
                }
              </tbody>
            </table>
            <input className="btn-adicionar" type="submit" value="Adicionar"/>
          </form>
        </Container>
      </main>      
    );
  }
}