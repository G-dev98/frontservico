import { useEffect, useState } from "react";
import "./Servico.css";
import axios from "axios";

function Servico() {
  const [servico, setServico] = useState({
    nomeCliente: "",
    dataInicio: "",
    dataFim: "",
    descricaoServico: "",
    valorServico: "",
    valorPago: "",
    dataPagamento: "",
  });
  const [servicos, setServicos] = useState([]);
  const [atualizar, setAtualizar] = useState();

  useEffect(() => {
    axios.get("http://localhost:8080/api/servico/", servico).then((result) => {
      setServicos(result.data);
    });
  }, [atualizar]);

  function traduzStatus(number) {
    if (number == 1) {
      return "PENDENTE";
    } else if (number == 2) {
      return "REALIZADO";
    } else {
      return "CANCELADO";
    }
  }

  function handleChange(event) {
    setServico({ ...servico, [event.target.name]: event.target.value });
  }

  function limpar() {
    setServico({}); // Definir o estado do serviço como um objeto vazio

    // Limpar os valores dos campos de entrada
    document.getElementById("nomeCliente").value = null;
    document.getElementById("dataInicio").value = null;
    document.getElementById("dataFim").value = null;
    document.getElementById("descricaoServico").value = null;
    document.getElementById("valorServico").value = null;
    document.getElementById("valorPago").value = null;
    document.getElementById("dataPagamento").value = null;
  }

  function hanbleSubmit(event) {
    event.preventDefault();
    if (servico && servico.id) {
      axios
        .put("http://localhost:8080/api/servico/update", servico)
        .then((result) => {
          setAtualizar(result);
          limpar();
        });
    } else {
      axios
        .post("http://localhost:8080/api/servico/create", servico)
        .then((result) => {
          setAtualizar(result);
          limpar();
        });
    }
  }

  function excluir(id) {
    axios
      .delete("http://localhost:8080/api/servico/delete/" + id)
      .then((result) => {
        setAtualizar(result);
      });
  }

  function cancelar(serv) {
    debugger;
    if (serv.status != 3) {
      serv.status = 3;
    }
    axios
      .put("http://localhost:8080/api/servico/cancelar", serv)
      .then((result) => {
        setAtualizar(result);
        limpar();
      });
  }

  return (
    <div className="container">
      <h1>Cadastros de Serviço</h1>
      <form onSubmit={hanbleSubmit}>
        <div className="form-group col-sm-6 col-md-6 col-lg-6">
          <div>
            <label className="form-label float-left fw-semibold required-label">
              {" "}
              Nome do Cliente
            </label>
            <div style={{ width: "auto" }}>
              <input
                className="form-control form-control-sm"
                id="nomeCliente"
                name="nomeCliente"
                value={servico.nomeCliente || ""}
                placeholder="Digite o nome do Cliente"
                onChange={handleChange}
                type="text"
                required
              ></input>
            </div>
          </div>

          <div>
            <label className="form-label float-left fw-semibold">
              Data de Início
            </label>
            <div style={{ width: "auto" }}>
              <input
                className="form-control form-control-sm"
                onChange={handleChange}
                id="dataInicio"
                value={servico.dataInicio || ""}
                name="dataInicio"
                type="date"
              ></input>
            </div>
          </div>

          <div>
            <label className="form-label float-left fw-semibold">
              Data de Término
            </label>
            <div style={{ width: "auto" }}>
              <input
                className="form-control form-control-sm"
                onChange={handleChange}
                id="dataFim"
                value={servico.dataFim || ""}
                name="dataFim"
                type="date"
              ></input>
            </div>
          </div>

          <div>
            <label className="form-label float-left fw-semibold">
              {" "}
              Descrição Serviço
            </label>
            <div style={{ width: "auto" }}>
              <input
                className="form-control form-control-sm"
                onChange={handleChange}
                id="descricaoServico"
                value={servico.descricaoServico || ""}
                name="descricaoServico"
                placeholder="Digite a descrição para o Serviço"
                type="text"
              ></input>
            </div>
          </div>

          <div>
            <label className="form-label float-left fw-semibold">
              Valor do Serviço
            </label>
            <div style={{ width: "auto" }}>
              <input
                className="form-control form-control-sm"
                onChange={handleChange}
                id="valorServico"
                value={servico.valorServico || ""}
                name="valorServico"
                placeholder="Digite o valor pago R$00,00"
                type="number"
              ></input>
            </div>
          </div>

          <div>
            <label className="form-label float-left fw-semibold">
              Valor Pago
            </label>
            <div style={{ width: "auto" }}>
              <input
                className="form-control form-control-sm"
                onChange={handleChange}
                id="valorPago"
                value={servico.valorPago || ""}
                name="valorPago"
                placeholder="Digite o valor pago R$00,00"
                type="number"
              ></input>
            </div>
          </div>

          <div>
            <label className="form-label float-left fw-semibold">
              Data de Pagamento
            </label>
            <div style={{ width: "auto" }}>
              <input
                className="form-control form-control-sm"
                onChange={handleChange}
                id="dataPagamento"
                value={servico.dataPagamento || ""}
                name="dataPagamento"
                type="date"
              ></input>
            </div>
          </div>

          <br />
          <div>
            {servico && servico.id ? (
              <>
                <button
                  type="submit"
                  className="btn btn-primary"
                  value="Salvar Alterações"
                >
                  Salvar
                </button>
                &nbsp;
                <button
                  type="submit"
                  className="btn btn-danger"
                  value="Cancelar Alterações"
                  onClick={limpar}
                >
                  Cancelar Alteração
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="btn btn-success"
                value="Cadastrar"
              >
                Cadastrar
              </button>
            )}
          </div>
        </div>
      </form>
      <hr />

      <div className="buttons-container" style={{ textAlign: 'center' }}>
      <button type="submit" className="btn btn-primary" value="Lista Todos"onClick={() => {
          axios.get("http://localhost:8080/api/servico/").then((result) =>{
            setServicos(result.data);
          }, [atualizar]);
        }}>
        Listar todos
      </button>&nbsp;&nbsp;
      <button
        type="submit"
        className="btn btn-secondary"
        value="Somente os Cancelados"
        onClick={() => {
          axios.get("http://localhost:8080/api/servico/canceled").then((result) =>{
            setServicos(result.data);
          }, [atualizar]);
        }}
      >
        Listar Somente os Cancelados
      </button>
    </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nome Cliente</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor Serviço</th>
            <th scope="col">Status</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map((serv) => (
            <tr key={serv.id}>
              <td>{serv.nomeCliente}</td>
              <td>{serv.descricaoServico}</td>
              <td>R$ {serv.valorServico}</td>
              <td>{traduzStatus(serv.status)}</td>
              <td>
                {serv && serv.status !== 3 && (
                  <>
                    <button
                      className="btn btn-sm btn-primary"
                      title="Editar"
                      onClick={() => setServico(serv)}
                    >
                      Editar
                    </button>
                    &nbsp;&nbsp;
                  </>
                )}
                <button
                  className="btn btn-sm btn-danger"
                  title="Excluir"
                  onClick={() => {
                    const confirmMessage =
                      "Deseja realmente excluir o registro de número " +
                      serv.id +
                      ". Após a ação ser confirmada não poderá ser desfeita. Deseja prosseguir?";
                    if (window.confirm(confirmMessage)) {
                      excluir(serv.id);
                    }
                  }}
                >
                  Excluir
                </button>
                &nbsp;&nbsp;
                {serv && serv.status !== 3 && (
                  <>
                    <button
                      className="btn btn-sm btn-warning"
                      title="Cancelar"
                      style={{ color: "white" }}
                      onClick={() => {
                        cancelar(serv);
                      }}
                    >
                      Cancelar
                    </button>
                    &nbsp;&nbsp;
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Servico;
