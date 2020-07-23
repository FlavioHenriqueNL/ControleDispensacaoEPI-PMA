import React, {useState, useEffect} from 'react';
import Firebase from '../../Database/Connection';
import {Button, TextField, Container, CssBaseline} from '@material-ui/core';
import {withRouter, useHistory} from 'react-router-dom';

import logo from '../../Assets/img/logo.svg';

import "../../Assets/css/style.css";

const Login = () => {

  const history = useHistory();
 
  useEffect(()=>{
    Firebase.auth.onAuthStateChanged(
      (auth) => {if(auth) return(history.push('/'))}
    )
  },[history])
  
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const entrar = (e) =>{
    e.preventDefault();
    Firebase.logar(login,senha).then(
      (user) => {
        history.push('/');
      }
    ).catch((error)=>{
      alert(error);
    });
    
  }

  return (
    <main id="login">
      <Container className="Container" component="main" maxWidth="xs">
      <CssBaseline />
      <div className="box">
        
        <figure className="figure">
          <img width="100%" height="auto" src={logo} alt="Saúde na Hora"/>
        </figure>

        <form noValidate onSubmit={entrar}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange = {e => setLogin(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {e => setSenha(e.target.value)}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
                        >
            Entrar
          </Button>

        </form>
      </div>
    </Container>
    </main>
  );

  
}

export default withRouter(Login);