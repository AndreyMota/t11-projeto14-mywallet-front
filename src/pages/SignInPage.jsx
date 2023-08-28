import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useEffect, useState, useContext } from "react"
import api from "../axiosConfig";
import { AuthContext } from "../contexts/AuthContext";

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const { getUser } = useContext(AuthContext);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  const handleForm = (event, qual) => {
    qual(event.target.value);
    console.log(event.target.value);
  }

  useEffect(() => {
    if (token) {
      getUser(token);
      navigate('/home');
      /* setTimeout(() => {
        navigate('/home');
      }, 1000); */
      
    }
  }, [token]);

  const logaUser = (e) => {
    e.preventDefault();

    const objt = {
      email,
      senha
    }

    api.post(`/`, objt)
      .then((res) => {
        console.log(res);
        console.log(res.data.token);
        setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
    
  }

  if (token) {
    return <h1>LOADING</h1>
  }

  return (
    <SingInContainer>
      <form onSubmit={logaUser}>
        <MyWalletLogo />
        <input data-test="email" onChange={() => handleForm(event, setEmail)} placeholder="E-mail" type="email" />
        <input data-test="password" onChange={() => handleForm(event, setSenha)} placeholder="Senha" type="password" autocomplete="new-password" />
        <button data-test="sign-in-submit">Entrar</button>
      </form>

      <Link to={'/cadastro'}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
