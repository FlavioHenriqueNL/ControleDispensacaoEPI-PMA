import React from 'react';
import firebase from '../Database/Connection';
import { makeStyles } from "@material-ui/core/styles";

export default function Logout(){
  const style = useStyles();
  return(
    <button className={style.buttonLogout} onClick={e => firebase.logout()}>Sair do sistema</button>
  );
}

const useStyles = makeStyles(theme => ({
  buttonLogout: {
    border: 'none',
    background: 'none',
    color: '#1C5A94',
    fontWeight: 'bolder',
    fontFamily: 'Roboto'
  }
}));

