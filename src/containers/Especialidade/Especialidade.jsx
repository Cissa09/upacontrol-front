import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Service from "../../service";

export default function Especialidade(props) {
  const [formEspecialidade, setForm] = useState({});

  const { state, dispatch } = props;
  const { especialidades } = state;

  const handleChangeField = (target) => {
    const { value, name } = target;
    setForm({ ...formEspecialidade, [name]: value });
  };

  const postEspecialidade = useCallback(
    async (value) => {
      dispatch({ type: "set_loading", payload: true });
      const response = await Service.post(`Especialidade`, "ESPECIALIDADE", value);
      dispatch({
        type: "set_render_list_especialidades",
        payload: { ...response },
      });
      dispatch({ type: "set_loading", payload: false });
      setForm({});
    },
    [dispatch]
  );

  const putEspecialidade = useCallback(
    async (value) => {
      dispatch({ type: "set_loading", payload: true });
      const response = await Service.put(`Especialidade/${value.id}`, "ESPECIALIDADE", value);
      dispatch({
        type: "set_render_list_especialidades",
        payload: { ...response },
      });
      dispatch({ type: "set_loading", payload: false });
      setForm({});
    },
    [dispatch]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    formEspecialidade.id
      ? postEspecialidade(formEspecialidade)
      : putEspecialidade(formEspecialidade);
  };

  const handleClickEdit = (especialidade) => {
    dispatch({ type: "set_edit_especialidades", payload: especialidade });
    dispatch({ type: `set_render_list_especialidades`, payload: false });
  };

  const handleCancel = () => {
    setForm({});
    dispatch({ type: `set_render_list_especialidades`, payload: true });
    dispatch({ type: "set_loading", payload: true });
    setTimeout(() => {
      dispatch({ type: "set_loading", payload: false });
    }, 1000);
  };

  useEffect(() => {
    if (especialidades.edit) setForm(especialidades.edit);
  }, [especialidades.edit]);

  const getListaEspecialidades = useCallback(async () => {
    const response = await Service.get("Especialidade", "ESPECIALIDADES");
    dispatch({ type: "set_list_especies", payload: response.data });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "set_loading", payload: true });
    setTimeout(() => {
      state.especialidades.lista.length === 0 && getListaEspecialidades();
      dispatch({ type: "set_loading", payload: false });
    }, 1000);
  }, [dispatch, state.especialidades.lista, getListaEspecialidades]);

  return !especialidades?.renderList ? (
    <>
      <Grid>
        <br />
      </Grid>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="nome"
              name="nome"
              label="Nome"
              fullWidth
              value={formEspecialidade.nome}
              onChange={(event) => handleChangeField(event.currentTarget)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="descricao"
              name="descricao"
              label="Descrição"
              fullWidth
              value={formEspecialidade.descricao}
              onChange={(event) => handleChangeField(event.currentTarget)}
            />
          </Grid>
          <Grid>
            <hr />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" onClick={() => handleCancel()}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </Box>
      </Box>
    </>
  ) : (
    <>
      <Grid>
        <br />
      </Grid>
      <Grid container spacing={2}>
        {especialidades.lista.map((especialidade, index) => (
          <Grid item key={index} xs={12} sm={12} md={3}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {especialidade.nome}
                </Typography>
                <Typography>{especialidade.descricao}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => handleClickEdit(especialidade)}
                  size="small"
                >
                  Editar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
