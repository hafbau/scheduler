import { useEffect, useReducer } from "react";
import axios from "../axios-instance";
import {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SPOTS
} from "../redecers/actionTypes";
import { reducer } from "../redecers/reducer";
import { INITIAL_STATE } from "../redecers/reducer";
import {
  getBookAppointmentDay,
  decreaseSpots,
  increaseSpots
} from "../helpers/selectors";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setDay = day => dispatch({ type: SET_DAY, payload: day });

  useEffect(() => {
    Promise.all([
      axios("/days"),
      axios("/appointments"),
      axios("/interviewers")
    ])
      .then(res => {
        console.log(res);
        dispatch({
          type: SET_APPLICATION_DATA,
          days: res[0].data,
          appointments: res[1].data,
          interviewers: res[2].data
        });
      })
      .catch(error => console.log(error));
  }, []);

  const bookInterview = (id, interview) => {
    console.log("ID", id, "interview", interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const findDay = getBookAppointmentDay(state, id);
    const days = decreaseSpots(state, findDay);

    return axios.put(`/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, payload: appointments });
      dispatch({ type: SET_SPOTS, payload: days });
    });
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const findDay = getBookAppointmentDay(state, id);
    const days = increaseSpots(state, findDay);

    return axios.delete(`/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, payload: appointments });
      dispatch({ type: SET_SPOTS, payload: days });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};

export default useApplicationData;
