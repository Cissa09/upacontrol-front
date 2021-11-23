import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

import Service from "../../service";


export default function Medico(props) {
  const [formMedico, setForm] = useState({});

  const { state, dispatch } = props;
  const { medicos, especialidades } = state;

  const handleChangeField = (target) => {
    const { value, name } = target;
    setForm({ ...formMedico, [name]: value });
  };

  const postMedico = useCallback(
    async (value) => {
      dispatch({ type: "set_loading", payload: true });
      const response = await Service.post(`Medico`, "MÉDICO", value);
      dispatch({
        type: "set_render_list_medicos",
        payload: { ...response },
      });
      dispatch({ type: "set_loading", payload: false });
      setForm({});
    },
    [dispatch]
  );

  const putMedico = useCallback(
    async (value) => {
      dispatch({ type: "set_loading", payload: true });
      const response = await Service.put(`Medico/${value.id}`, "MÉDICO", value);
      dispatch({
        type: "set_render_list_medicos",
        payload: { ...response },
      });
      dispatch({ type: "set_loading", payload: false });
      setForm({});
    },
    [dispatch]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    formMedico.id ? postMedico(formMedico) : putMedico(formMedico);
  };

  const handleClickEdit = (medico) => {
    dispatch({ type: "set_edit_medicos", payload: medico });
    dispatch({ type: `set_render_list_medicos`, payload: false });
  };

  const handleCancel = () => {
    setForm({});
    dispatch({ type: `set_render_list_medicos`, payload: true });
    dispatch({ type: "set_loading", payload: true });
    setTimeout(() => {
      dispatch({ type: "set_loading", payload: false });
    }, 1000);
  };

  const getListaEspecialidades = useCallback(async () => {
    const response = await Service.get("Especialidade", "ESPECIALIDADES");
    dispatch({ type: "set_list_especialidades", payload: response.data });
  }, [dispatch]);

  useEffect(() => {
    if (medicos.edit) setForm(medicos.edit) && getListaEspecialidades();
  }, [medicos.edit, dispatch, getListaEspecialidades]);

  const getListaMedicos = useCallback(async () => {
    const response = await Service.get("Medico", "MEDICOS");
    dispatch({ type: "set_list_medicos", payload: response.data });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "set_loading", payload: true });
    setTimeout(() => {
      dispatch({ type: "set_loading", payload: false });
      state.medicos.lista.length === 0 && getListaMedicos();
    }, 1000);
  }, [dispatch, state.medicos.lista, getListaMedicos]);

  return !medicos?.renderList ? (
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
              value={formMedico.nome}
              onChange={(event) => handleChangeField(event.target)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="sexo"
              name="sexo"
              label="Sexo"
              fullWidth
              value={formMedico.sexo}
              onChange={(event) => handleChangeField(event.target)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="cpfcnpj"
              name="cpfcnpj"
              label="Cpf/Cnpj"
              fullWidth
              value={formMedico.cpfcnpj}
              onChange={(event) => handleChangeField(event.target)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="rg"
              name="rg"
              label="RG"
              fullWidth
              value={formMedico.rg}
              onChange={(event) => handleChangeField(event.target)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="crn"
              name="crm"
              label="CRM"
              fullWidth
              value={formMedico.crm}
              onChange={(event) => handleChangeField(event.target)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="data_nascimento"
              name="data_nascimento"
              label="Data Nascimennto"
              fullWidth
              value={formMedico.data_nascimento}
              onChange={(event) => handleChangeField(event.target)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="obs"
              name="obs"
              label="Observação"
              fullWidth
              value={formMedico.obs}
              onChange={(event) => handleChangeField(event.target)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Especialidade
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-helper-label"
                id="id_especialidade"
                name="id_especialidade"
                label="Especialidade"
                fullWidth
                value={parseInt(formMedico.id_especialidade, 10) || 0}
                onChange={(event) => handleChangeField(event.target)}
              >
                {especialidades.lista.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
        {medicos.lista.map((medico, index) => (
          <Grid item key={index} xs={12} sm={12} md={3}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {medico.nome}
                </Typography>
                <Typography>{medico.crm}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleClickEdit(medico)} size="small">
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
