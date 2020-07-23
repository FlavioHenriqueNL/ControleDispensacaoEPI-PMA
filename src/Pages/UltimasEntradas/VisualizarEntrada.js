import React, {useState} from 'react';
import {Modal} from '@material-ui/core';



export default function VisualizarEntrada(props){

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData]= useState("");
  const [nome, setNome]= useState("");
  const [entrada, setEntrada]= useState([]);

  console.log("Retono detro do component Visualizar");
  console.log(props.parametro.data);

  setData(props.parametro.data);
 

  const handleOpen = () =>{
    return setIsOpen(true);
  }
  const handleClose = () => {
    return setIsOpen(false);
  }



  return(
    <div>
      <button onClick={() => handleOpen()}></button>
      <Modal open={isOpen} onClose={handleClose} aria-labelledby="Visualizar Entrada">

        <h1>Teste</h1>
        

      </Modal>
    </div>
  );
}