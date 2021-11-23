 export default function reducer(state, action) {
  switch (action.type) {
    case 'set_user':
      return { ...state, user: action.payload }
    case 'set_render_list_especialidades':
      return {
        ...state,
        especialidades: {
          ...state.especialidades,
          renderList: action.payload
        }
      }
    case 'set_list_especies':
      return {
        ...state,
        especialidades: {
          ...state.especialidades,
          lista: action.payload
        }
      }
    case 'set_new_especialidades':
      var lista = state.especialidades.lista
      var index = lista.findIndex(e => e.id === action.payload.id);
      if (index >= 0) {
        lista[index] = action.payload
        return {
          ...state,
          especialidades: {
            ...state.especialidades,
            lista: lista
          }
        }
      } else {
        lista.push(action.payload)
        return {
          ...state,
          especialidades: {
            ...state.especialidades,
            lista: lista
          }
        }
      }
    case 'set_edit_especialidades':
      return {
        ...state,
        especialidades: {
          ...state.especialidades,
          edit: action.payload
        }
      } 
    case 'set_render_list_medicos':
    return {
      ...state,
      medicos: {
        ...state.medicos,
        renderList: action.payload
      }
    }
    case 'set_list_medicos':
    return {
      ...state,
      medicos: {
        ...state.medicos,
        lista: action.payload
      }
    }
    case 'set_new_medicos':
    var listaMedicos = state.medicos.lista
    var indexMedico = listaMedicos.findIndex(m => m.id === action.payload.id);
    if (indexMedico >= 0) {
      listaMedicos[indexMedico] = action.payload
      return {
        ...state,
        medicos: {
          ...state.medicos,
          listaMedicos: listaMedicos
        }
      }
    } else {
      listaMedicos.push(action.payload)
      return {
        ...state,
        medicos: {
          ...state.medicos,
          listaMedicos: listaMedicos
        }
      }
    }
    case 'set_edit_medicos':
    return {
      ...state,
      medicos: {
        ...state.medicos,
        edit: action.payload
      }
    }
    case 'set_render_list_agenda':
      console.log(action.payload)
    return {
      ...state,
      agenda: {
        ...state.agenda,
        renderList: action.payload
      }
    }
    case 'set_list_agenda':
    return {
      ...state,
      agenda: {
        ...state.agenda,
        lista: action.payload
      }
    }
    case 'set_list_agendamento':
    return {
      ...state,
      agenda: {
        ...state.agenda,
        agendamentos: action.payload
      }
    }
    case 'set_new_agendamento':
    var listaAgendamentos = state.agenda.agendamentos
    var indexAgenda = listaAgendamentos.findIndex(a => a.id === action.payload.id);
    if (indexAgenda >= 0) {
      listaAgendamentos[indexAgenda] = action.payload
      return {
        ...state,
        agenda: {
          ...state.agenda,
          agendamentos: listaAgendamentos
        }
      }
    } else {
      listaAgendamentos.push(action.payload)
      return {
        ...state,
        agenda: {
          ...state.agenda,
          agendamentos: listaAgendamentos
        }
      }
    }
    case 'set_edit_agenda':
    return {
      ...state,
      agenda: {
        ...state.agenda,
        edit: action.payload
      }
    }
    case 'set_loading':
    return {
      ...state,
      loading: action.payload
    }
    default:
      throw new Error();
  }
}