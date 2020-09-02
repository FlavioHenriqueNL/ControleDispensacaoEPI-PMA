import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TabelaEpis from './TabelaEpis';
import { Grid } from '@material-ui/core';

import './style.scss'
// import Comprovante from './Comprovante';
import { Link } from 'react-router-dom';

export default function AcordeaoIO({movimentacao}){

  const LinkToComprovante = ({movimentacao}) => {
    const newTo = {
      pathname: `/comprovante/${movimentacao.id}`,
      state: { movimentacao }
    }
    return(
      <Link className="link-comprovante" to={newTo} > Gerar comprovante </Link>
    )
  }

  return(
    <Accordion key={movimentacao.id} className="accordion">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={movimentacao.id}
        id={movimentacao.id}
        className="acordeao-base"
      >
        <div class="acordeao-titulo-container">
          <div className="acordeao-titulo-conteudo">
            <Typography className="id"><span>ID: </span>{movimentacao.id}</Typography>
          </div>
          <div className="acordeao-titulo-conteudo">
            <Typography className="data"><span>Data: </span>{movimentacao.data}</Typography>
            
          </div>
          {movimentacao.ubs != null ? 
            <div className="acordeao-titulo-conteudo">
              <Typography className="ubs"><span>UBS: </span>{movimentacao.ubs}</Typography>
            </div>
            :
            null
          }
        </div>
      </AccordionSummary>
      <AccordionDetails className="acordeao-content">

        <Grid container spacing={3} className="acordeao-content-container">
          <Grid className="acordeao-content-conteudo" md={6} xs={12}>
            <h1><span>Data:</span> {movimentacao.data}</h1>
          </Grid>
          <Grid className="acordeao-content-conteudo" md={6} xs={12}>
            <h1><span>Dispensador:</span> {movimentacao.entregador}</h1>
          </Grid>
          <Grid xs={12}>
            <TabelaEpis lista={movimentacao.epis}/>
            <LinkToComprovante movimentacao={movimentacao}/>
          </Grid>
          
        </Grid>

      </AccordionDetails>
    </Accordion>
  )


}