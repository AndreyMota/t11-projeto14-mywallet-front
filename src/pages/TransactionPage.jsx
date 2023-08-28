import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import api from "../axiosConfig";

export default function TransactionsPage() {
  const [valor, setValor] = useState('');
  const [desc, setDesc] = useState('');
  const { tipo } = useParams();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate('/');
    }
  }, []);

  function formatNumberToFloat(value) {
    const stringValue = String(value);

    // Removendo caracteres não numéricos, exceto pontos e vírgulas
    const numericString = stringValue.replace(/[^0-9.,]/g, '');
  
    // Substituindo múltiplos pontos/vírgulas por um único ponto
    const dotFormattedString = numericString.replace(/([.,])+/g, '.');
  
    // Removendo pontos/vírgulas no início e final do número
    const trimmedString = dotFormattedString.replace(/^[.,]+|[.,]+$/g, '');
  
    // Convertendo para um número de ponto flutuante com 2 casas decimais
    return parseFloat(trimmedString).toFixed(2);
  }

  const handleForm = (event, qual) => {
    qual(event.target.value);
    console.log(event.target.value);
  }

  const handleChange = (event) => {
    const { value } = event.target;
    const novoValor = value.replace(/[^0-9.,]/g, ''); 
    setValor(novoValor);
  };

  const enviaTransa = (event) => {
    event.preventDefault();
    if (!valor || !desc) {
      alert('preencha todos os campos!');
      return
    };
    const finalValor = formatNumberToFloat(valor);
    console.log(typeof(finalValor));
    console.log(finalValor);
    console.log(typeof(desc));

    const objt = {
      descricao: desc,
      valor: parseFloat(finalValor)
    }
    api.post(`nova-transacao/${tipo === 'entrada'? 'entrada' : 'saida'}`, objt, {headers: {
      "Authorization": `Bearer ${token}`
    }})
    .then((res) => {
      console.log(res);
      navigate('/home');
    })
    .catch((err) => {
      alert(err.message);
    })
  }

  if (!token) {
    return <h1>LOADING</h1>
  }
  
  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={() => enviaTransa(event)}>
        <input data-test="registry-amount-input" onChange={handleChange} value={valor} placeholder="Valor" type="text"/>
        <input data-test="registry-name-input" onChange={() => handleForm(event, setDesc)} value={desc} placeholder="Descrição" type="text" />
        <button data-test="registry-save">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
