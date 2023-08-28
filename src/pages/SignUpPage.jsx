import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import api from "../axiosConfig"
import { useEffect, useState } from "react"

export default function SignUpPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const navigate = useNavigate();

  const handleForm = (event, qual) => {
    qual(event.target.value);
    console.log(event.target.value);
  }


  useEffect(() => {
    api.get('nova-transacao', {headers: {
      'Authorization': 'Bearer 60e5717f-b1e2-4e79-a1d3-3e5644a1b67e'
    }}) 
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }, []);

  function cadastrar() {
    event.preventDefault();
    if (!nome || !email || !senha || !senha2) {
      alert('Preencha todos os campos');
      return;
    }
    if (senha !== senha2) {
      alert("Senhas diferentes");
      return;
    }
    const objt = {
      nome: nome,
      email: email,
      senha: senha
    }

    api.post(`cadastro`, objt)
      .then((res) => {
        console.log(res);
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
  }
  return (
    <SingUpContainer>
      <form >
        <MyWalletLogo />
        <input data-test="name" onChange={() => handleForm(event, setNome)} value={nome} placeholder="Nome" type="text" />
        <input data-test="email" onChange={() => handleForm(event, setEmail)} value={email} placeholder="E-mail" type="email" />
        <input data-test="password" onChange={() => handleForm(event, setSenha)} value={senha} placeholder="Senha" type="password" autocomplete="new-password" />
        <input data-test="conf-password" onChange={() => handleForm(event, setSenha2)} value={senha2} placeholder="Confirme a senha" type="password" autocomplete="new-password" />
        <button data-test="sign-up-submit" onClick={cadastrar}>Cadastrar</button>
      </form>

      <Link>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
