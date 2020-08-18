import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './style.scss';

export default function TabelaEpis({lista}){

  return(
    <TableContainer component={Paper}>
      <Table aria-label="simple table" className="tabela-entrada-saida">
        <TableHead className="tableHead">
          <TableRow>
            <TableCell align="center">Nome do Epi</TableCell>
            <TableCell align="center">Quantidade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lista.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.nome}</TableCell>
              <TableCell align="center">{row.quantidade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}