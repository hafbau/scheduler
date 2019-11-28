import { useState, useEffect } from "react";
import axios from "../axios-instance";

const useApplicationData = initial => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments }));
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
    return axios
      .delete(`/appointments/${id}`)
      .then(() => setState(prev => ({ ...prev, appointments })));
  };

  useEffect(() => {
    Promise.all([
      axios("/days"),
      axios("/appointments"),
      axios("/interviewers")
    ])
      .then(res => {
        console.log(res);
        setState(prev => ({
          ...prev,
          days: res[0].data,
          appointments: res[1].data,
          interviewers: res[2].data
        }));
      })
      .catch(error => console.log(error));
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};

export default useApplicationData;
