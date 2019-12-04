import { useEffect, useReducer } from "react";
import axios from "../axios-instance";
import {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SPOTS
} from "../redecers/actionTypes";
import { reducer } from "../redecers/application";
import { INITIAL_STATE } from "../redecers/application";
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
      axios.get("/days"),
      axios.get("/appointments"),
      axios.get("/interviewers")
    ])
      .then(res => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: res[0].data,
          appointments: res[1].data,
          interviewers: res[2].data
        });
      })
      .catch(error => console.log(error));
    return () => {};
  }, []);

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.onopen = () => {
      //console.log('Connected');
    };

    socket.onmessage = message => {
      const msg = JSON.parse(message.data);

      switch (msg.type) {
        case "SET_INTERVIEW":
          const id = msg.id;
          const interview = msg.interview;
          const findDay = getBookAppointmentDay(state, id);
          if (interview) {
            const days = decreaseSpots(state, findDay);
            dispatch({
              type: SET_INTERVIEW,
              id: id,
              interview: { ...interview }
            });
            dispatch({ type: SET_SPOTS, payload: days });
          } else {
            const days = increaseSpots(state, findDay);
            dispatch({ type: SET_INTERVIEW, id: id, interview: null });
            dispatch({ type: SET_SPOTS, payload: days });
          }
          break;
        default:
          throw new Error("Socket error");
      }
    };
    return () => {
      socket.close();
    };
  }, [state]);

  const bookInterview = (id, interview) => {
    const findDay = getBookAppointmentDay(state, id);
    const days = decreaseSpots(state, findDay);

    return axios.put(`/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, id: id, interview: { ...interview } });
      dispatch({ type: SET_SPOTS, payload: days });
    });
  };

  const editInterview = (id, interview) => {
    return axios.put(`/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, id: id, interview: { ...interview } });
    });
  };

  const cancelInterview = id => {
    const findDay = getBookAppointmentDay(state, id);
    const days = increaseSpots(state, findDay);

    return axios.delete(`/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, id: id, interview: null });
      dispatch({ type: SET_SPOTS, payload: days });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  };
};

export default useApplicationData;
