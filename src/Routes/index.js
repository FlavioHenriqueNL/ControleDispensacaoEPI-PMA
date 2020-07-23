import React, {useState, useEffect} from 'react';
import firebase from '../Database/Connection';

import RouterNavigation from './RouterNavigation';

const Auth = () => {

  const [auth, setAuth] = useState(true);


  useEffect(()=>{
    firebase.auth.onAuthStateChanged((authenticated)=>{setAuth(authenticated)})
  },[]);

  return(
    <RouterNavigation authenticated={auth} />
  )
}
export default Auth;


