import { useState } from 'react';
import './Servico.css';
import axios from 'axios';

function Servico() {

    const [servico, setServico] = useState({ nomeCliente: '', dataInicio: '', dataFim: '', descricaoServico: '', valorServico: '', valorPago: '', dataPagamento: '' });
    const [servicos, setServicos] = useState([]);

    function handleChange(event) {
        setServico({ ...servico, [event.target.name]: event.target.value });
    }

    function hanbleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8080/api/servico/create", servico).then(result => {
            console.log(result);
        });

    }

    return (
        <div className="container">
            <h1>Cadastros de Serviço</h1>
            <form onSubmit={hanbleSubmit}>
                <div className="form-group col-sm-6 col-md-6 col-lg-6">
                    <div >
                        <label className="form-label float-left fw-semibold required-label"> Nome do Serviço</label>
                        <div style={{ width: 'auto' }}>
                            <input className="form-control form-control-sm"
                                id="nomeCliente"
                                name="nomeCliente"
                                value={servico.nomeCliente}
                                placeholder="Digite o nome do Cliente"
                                onChange={handleChange}
                                type="text" required></input>
                        </div>

                    </div>

                    <div>
                        <label className="form-label float-left fw-semibold">Data de Início</label>
                        <div style={{ width: 'auto' }}>
                            <input className="form-control form-control-sm"
                                onChange={handleChange}
                                id="dataInicio"
                                value={servico.dataInicio}
                                name="dataInicio"
                                type="date"></input>
                        </div>

                    </div>


                    <div>
                        <label className="form-label float-left fw-semibold">Data de Término</label>
                        <div style={{ width: 'auto' }}>
                            <input className="form-control form-control-sm"
                                onChange={handleChange}
                                id="dataFim"
                                value={servico.dataFim}
                                name="dataFim"
                                type="date"></input>
                        </div>

                    </div>

                    <div >
                        <label className="form-label float-left fw-semibold"> Descrição Serviço</label>
                        <div style={{ width: 'auto' }}>
                            <input className="form-control form-control-sm"
                                onChange={handleChange}
                                id="descricaoServico"
                                value={servico.descricaoServico}
                                name="descricaoServico"
                                placeholder="Digite a descrição para o Serviço"
                                type="text"></input>
                        </div>

                    </div>

                    <div >
                        <label className="form-label float-left fw-semibold">Valor do Serviço</label>
                        <div style={{ width: 'auto' }}>
                            <input className="form-control form-control-sm"
                                onChange={handleChange}
                                id="valorServico"
                                value={servico.valorServico}
                                name="valorServico"
                                placeholder="Digite o valor pago R$00,00"
                                type="number"></input>
                        </div>

                    </div>

                    <div >
                        <label className="form-label float-left fw-semibold">Valor Pago</label>
                        <div style={{ width: 'auto' }}>
                            <input className="form-control form-control-sm"
                                onChange={handleChange}
                                id="valorPago"
                                value={servico.valorPago}
                                name="valorPago"
                                placeholder="Digite o valor pago R$00,00"
                                type="number"></input>
                        </div>

                    </div>

                    <div>
                        <label className="form-label float-left fw-semibold">Data de Pagamento</label>
                        <div style={{ width: 'auto' }}>
                            <input className="form-control form-control-sm"
                                onChange={handleChange}
                                id="dataPagamento"
                                value={servico.dataPagamento}
                                name="dataPagamento"
                                type="date"></input>
                        </div>

                    </div>

                    <br />
                    <div>
                        <button type="submit" className="btn btn-success" value="Cadastrar"> Cadastrar</button>
                    </div>

                </div>
            </form>

            <hr /><hr />
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Nome Cliente</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Valor Serviço</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {servicos.map(serv =>
                        <tr>
                            <th>{serv.nomeCliente}</th>
                            <td>{serv.descricaoServico}</td>
                            <td>{serv.valorServico}</td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
}

export default Servico;
