import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../axiosConfig";

export default function HomePage() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));
  const [operations, setOps] = useState();
  const navigate = useNavigate();
  const { user, getUser } = useContext(AuthContext);


  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('token'));
    if (!storedToken) {
      setTimeout(() => {
        navigate('/')  
      }, 2500);
      
    } else {
      getUser(token);
      api.get('nova-transacao', {headers: {
        "Authorization": `Bearer ${token}`
      }})
      .then((res) => {
        console.log(res);
        setOps(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [navigate]);


  function logout() {
    event.preventDefault()
    console.log('oi');
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken();
    navigate('/');
  }

  if (!user) {
    return <h1>LOADING</h1>
  }

  if (!token) {
    return <h1>LOADING</h1>
  }

  let saldo = 0;

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {user?.nome}</h1>
        <button data-test="logout" onClick={logout}>
          <BiExit className="bt"/>
        </button>
      </Header>

      <TransactionsContainer>
        <ul>
          {operations?.map((x) => {
            if (x.tipo === "entrada") saldo += x.valor;
            if (x.tipo === "saida") saldo -= x.valor;
            return (
              <ListItemContainer>
                <div>
                  <span>{x.dia}</span>
                  <strong data-test="registry-name">{x.descricao}</strong>
                </div>
                <Value color={x.tipo}><p data-test="registry-amount">{x.valor.toFixed(2)}</p></Value>
              </ListItemContainer>
            )
          })}
        </ul>
        

        <article>
          <strong>Saldo</strong>
          {saldo>=0? <Value color={"entrada"}><p data-test="total-amount">{saldo.toFixed(2)}</p></Value> : <Value color={"saida"}><p data-test="total-amount">{saldo.toFixed(2)}</p></Value>}
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button data-test="new-income" onClick={() => navigate('/nova-transacao/entrada')}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button data-test="new-expense" onClick={() => navigate('/nova-transacao/saida')}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
  button {
    width: 25%;
    .bt {
      height: 90%;
    }
  }
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul {
    max-height: 350px;
    overflow-y: auto;
  }
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`