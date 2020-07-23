import firebase from 'firebase';
import apiKey from './apiKey';

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "ctrldispensacaoepi-arapiraca.firebaseapp.com",
  databaseURL: "https://ctrldispensacaoepi-arapiraca.firebaseio.com",
  projectId: "ctrldispensacaoepi-arapiraca",
  storageBucket: "ctrldispensacaoepi-arapiraca.appspot.com",
  messagingSenderId: "850324554199",
  appId: "1:850324554199:web:a41dedfd0f9e533203cb92"
};


class Firebase{
  constructor(){
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  logar(email,password){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    return this.auth.signOut();
  }

}



export default new Firebase();

