import React from 'react';
import {useParams,withRouter, useLocation, useHistory} from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from '../../Assets/img/logo.svg';

import './style.scss';

const Comprovante = () => {

  const history = useHistory();
  const {compID} = useParams();
  const location = useLocation();
  const movimentacao = location.state.movimentacao;
  console.log(movimentacao);

  return(
    <>
      <div>
        <div className="container">
          <div className="row py-2">
            <div className="col-auto">
              <button onClick={(e)=>{history.goBack()}} className="btn btn-primary">Voltar</button>
            </div>
          </div>
        </div>
      </div>
      <div id="printable">
      <header>
        <div className="container">
              <div className="cabecalho">
                <div className="row align-items-center justify-content-between">
                    <figure className="col-4">
                        <img className="img-fluid" src={logo} alt=""/>
                    </figure>
                    <div className="info col">
                        <h2>Prefeitura Municipal de Arapiraca</h2>
                        <h3>Secretaria Municipal de Saúde</h3> 
                    </div>
                </div>
            </div>
            <h1 className="titulo py-3">{movimentacao.ubs == null ? "Formulário de Entrada de EPI" : "Comprovante de Entrega de EPI / INSUMOS"}</h1>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="row py-3">
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="id">ID do documento</label>
                <input type="text" name="Id" readOnly value={compID} className="form-control"/>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="id">Data</label>
                <input type="text" name="Id" readOnly value={movimentacao.data} className="form-control"/>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="id">Dispensador</label>
                <input type="text" name="Id" readOnly value={movimentacao.entregador} className="form-control"/>
              </div>
            </div>
            {
              movimentacao.ubs !== null ? 
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="id">Unidade Básica de Saúde</label>
                  <input type="text" name="Id" readOnly value={movimentacao.ubs} className="form-control"/>
                </div>
              </div>
              :
              null
            }
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th>Nome do EPI/Insumo</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {movimentacao.epis.map((epi) => (
                    <tr className="text-center" key={epi.id}>
                      <td>{epi.nome}</td>
                      <td>{epi.quantidade}</td>
                    </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="dispensador">Assinatura do Dispensador</label>
                <input type="text" readOnly name="dispensador" className="form-control"/>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="ubs">Assinatura do Responsável UBS</label>
                <input type="text" readOnly name="ubs" className="form-control"/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div>
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <button onClick={(e) => {e.preventDefault(); window.print()}} className="btn btn-success">Imprimir Comprovante</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default withRouter(Comprovante);