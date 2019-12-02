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
      return () => {

      }
  }, []);

  useEffect(() => {

  const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
   socket.onopen = ()=>{
      console.log('Connected');
    };

    socket.onmessage = (message) => {
      console.log("incomming", message);

      const msg = JSON.parse(message.data);
      console.log("incomming", msg);

      switch(msg.type) {
        case "SET_INTERVIEW":
          const id = msg.id;
          const interview = msg.interview;
          const findDay = getBookAppointmentDay(state, id);
          if(interview) {
            const days = decreaseSpots(state, findDay);
            dispatch({ type: SET_INTERVIEW, id: id, interview: { ...interview } });
            dispatch({ type: SET_SPOTS, payload: days });
          } else {
            const days = increaseSpots(state, findDay);
            dispatch({ type: SET_INTERVIEW, id: id, interview: null });
            dispatch({ type: SET_SPOTS, payload: days });
          }
          break;
        default:
          throw new Error(
            "Socket error"
          );
      }
    }
    return (() => {
      socket.close();
    })

  }, [state])

  const bookInterview = (id, interview) => {

    const findDay = getBookAppointmentDay(state, id);
    const days = decreaseSpots(state, findDay);

    return axios.put(`/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, id: id, interview: { ...interview } });
      dispatch({ type: SET_SPOTS, payload: days });
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
    cancelInterview
  };
};

export default useApplicationData;
