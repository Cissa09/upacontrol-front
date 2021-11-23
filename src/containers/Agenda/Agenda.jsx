import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  AssignmentInd as AssignmentIndIcon,
  MedicalServices as MedicalServicesIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Service from "../../service";

export default function Agenda(props) {
  const [formAgendamento, setForm] = useState({});

  const { state, dispatch } = props;

  const { agenda, user, especialidades, medicos } = state;

  const handleChangeField = (target) => {
    const { value, name } = target;
    setForm({ ...formAgendamento, [name]: value });
  };

  const postAgendamento = useCallback(
    async (value) => {
      dispatch({ type: "set_loading", payload: true });
      const response = await Service.post(`Agenda`, "AGENDA", value);
      dispatch({ type: "set_new_agendamento", payload: { ...response } });     
    dispatch({ type: "set_loading", payload: false });
    setForm({});
    },
    [dispatch]
  );

  const putAgendamento = useCallback(
    async (value) => {
      dispatch({ type: "set_loading", payload: true });
      const response = await Service.put(`Agenda/${value.id}`, "AGENDA", value);
      dispatch({ type: "set_new_agendamento", payload: { ...response } });
      dispatch({ type: "set_loading", payload: false });
      setForm({});
    },
    [dispatch]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    formAgendamento.id
      ? postAgendamento(formAgendamento)
      : putAgendamento(formAgendamento);
  };

  const handleCancel = () => {
    setForm({});
    dispatch({ type: `set_render_list_especialidades`, payload: true });
    dispatch({ type: "set_loading", payload: true });
    setTimeout(() => {
      dispatch({ type: "set_loading", payload: false });
    }, 1000);
  };

  const configure = {
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin,
      listPlugin,
      bootstrapPlugin,
    ],
    initialView: "dayGridMonth",
    aspectRatio: 2.3,
  };

  const renderEventContent = (eventInfo) => {
    <>
      <i>{eventInfo.timeText}</i>
      <b> - {eventInfo.event.title}</b>
    </>;
  };

  const getListaAgenda = useCallback(
    async (id) => {
      dispatch({ type: "set_loading", payload: true });
      const response = await Service.get(`Agenda/${id}`, "AGENDA");
      dispatch({ type: "set_list_agenda", payload: response });
      dispatch({ type: "set_loading", payload: false });
    },
    [dispatch]
  );

  const getListaAgendamentos = useCallback(
    async (id) => {
      dispatch({ type: "set_loading", payload: true });
      const response = await Service.get(`Agendamentos/${id}`, "AGENDA");
      dispatch({ type: "set_list_agendamento", payload: response });
      dispatch({ type: "set_loading", payload: false });
    },
    [dispatch]
  );

  const getListaEspecialidades = useCallback(
    async (id) => {
      dispatch({ type: "set_loading", payload: true });
      const response = await Service.get(`Especialidades`, "ESPECIALIDADES");
      dispatch({ type: "set_list_especialidades", payload: response });
      dispatch({ type: "set_loading", payload: false });
    },
    [dispatch]
  );

  const getListaMedicos = useCallback(
    async (id) => {
      dispatch({ type: "set_loading", payload: true });
      const response = await Service.get(`Medicos`, "MÉDICOS");
      dispatch({ type: "set_list_medicos", payload: response });
      dispatch({ type: "set_loading", payload: false });
    },
    [dispatch]
  );

  useEffect(() => {
    user.type !== "paciente" && state.agenda.lista.length === 0
      ? getListaAgenda(user.id)
      : state.agenda.agendamentos.length === 0 && getListaAgendamentos(user.id);
    user.type !== "paciente" && getListaEspecialidades() && getListaMedicos();
  }, [
    dispatch,
    state.agenda.lista,
    state.agenda.agendamentos,
    user.id,
    user.type,
    getListaAgenda,
    getListaAgendamentos,
    getListaEspecialidades,
    getListaMedicos,
  ]);

  return user.type === "paciente" ? (
    !agenda?.renderList ? (
      <>
        <Grid>
          <br />
        </Grid>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Especialidade
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-helper-label"
                  id="especialidade"
                  name="especialidade"
                  label="Especialidade"
                  fullWidth
                  // value={parseInt(formMedico.id_especialidade, 10) || 0}
                  onChange={(event) => handleChangeField(event.target)}
                >
                  {especialidades.lista.map((e) => (
                    <MenuItem key={e.id} value={e}>
                      {e.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Médicos
                </InputLabel>
                <Select
                  required
                  disabled={!formAgendamento.especialidade}
                  labelId="demo-simple-select-helper-label"
                  id="medico"
                  name="medico"
                  label="Médicos"
                  fullWidth
                  // value={parseInt(formMedico.id_especialidade, 10) || 0}
                  onChange={(event) => handleChangeField(event.target)}
                >
                  {medicos.lista.map((m, index) => (
                    <MenuItem key={m.id} value={m}>
                      {m.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField required id="data" name="data" {...props} />
                  )}
                  label="Data e hora"
                  value={formAgendamento.data}
                  onChange={(newValue) => {
                    handleChangeField({ value: newValue, name: "data" });
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid>
            <hr />
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
          {agenda.agendamentos.map((agendamento, index) => (
            <Grid item key={index} xs={12} sm={12} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {agendamento.data} {agendamento.medico.especialidade.nome}
                  </Typography>
                  <Typography>
                    {" "}
                    <AccessTimeIcon sx={{ my: -0.5 }} fontSize="small" />{" "}
                    {agendamento.horario_inicio} até {agendamento.horario_fim}{" "}
                  </Typography>
                  <Typography>
                    {" "}
                    <AssignmentIndIcon
                      sx={{ my: -0.5 }}
                      fontSize="small"
                    />{" "}
                    {agendamento.medico.nome}{" "}
                  </Typography>
                  <Typography>
                    {" "}
                    <MedicalServicesIcon
                      sx={{ my: -0.5 }}
                      fontSize="small"
                    />{" "}
                    {agendamento.medico.especialidade.descricao}{" "}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => console.log()} size="small">
                    Editar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    )
  ) : (
    <FullCalendar
      plugins={configure.plugins}
      allDaySlot={false}
      headerToolbar={configure.headerToolbar}
      initialView={configure.initialView}
      locale={ptBrLocale}
      nowIndicator
      eventContent={renderEventContent}
      events={agenda.lista}
      selectAllow={(e) => false}
      eventAllow={(e) => false}
      aspectRatio={configure.aspectRatio}
      datesSet={(e) => false}
      select={(e) => false}
      eventChange={(e) => false} // called for drag-n-drop/resiz(e, )e
    />
  );
}
