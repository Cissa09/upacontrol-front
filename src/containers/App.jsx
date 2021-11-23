import React, { useReducer } from "react";
import { Route, Switch } from "react-router-dom";
import reducer from "./store";
import Login from "./Login/Login";
import Dashboard from "./Dashboard";

function App() {
  const INITIAL_STATE = {
    user: {},
    loading: false,
    especialidades: {
      renderList: true,
      lista: [],
    },
    medicos: {
      renderList: true,
      lista: [],
    },
    agenda: {
      renderList: true,
      agendamentos: [
        {
          id: 1,
          medico: {
            id: 1,
            nome: "Cicero de Azevedo Viganon",
            especialidade: {
              id: 1,
              nome: "teste",
              descricao: "teste",
            },
          },
          data: "17/11/2021",
          horario_inicio: "12:30",
          horario_fim: " 13:30",
        },
        {
          id: 2,
          medico: {
            id: 2,
            nome: "Cicero de Azevedo Viganon",
            especialidade: {
              id: 2,
              nome: "teste 2",
              descricao: "teste 22",
            },
          },
          data: "17/11/2021",
          horario_inicio: "14:30",
          horario_fim: " 15:30",
        },
      ],
      lista: [
        {
          id: 1,
          title: "Cicero de Azevedo Viganon",
          start: 1637172548163,
          end: 1637175999999,
          allDay: false,
        },
        {
          id: 1,
          title: "Cicero de Azevedo Viganon",
          start: 1637162548163,
          end: 1637165999999,
          allDay: false,
        },
      ],
    },
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Switch>
      <Route
        exact
        path="/login"
        children={<Login state={state} dispatch={dispatch} />}
      />
      <Route
        exact
        path="/dashboard"
        children={<Dashboard state={state} dispatch={dispatch} />}
      />
    </Switch>
  );
}

export default App;
