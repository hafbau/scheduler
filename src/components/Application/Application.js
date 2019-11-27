import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../../helpers/selectors";

import DayList from "components/DayList/DayList";
import Appointment from "components/Appointment";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios(`http://localhost:8001/api/days`),
      axios(`http://localhost:8001/api/appointments`),
      axios(`http://localhost:8001/api/interviewers`)
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

  const appointments = getAppointmentsForDay(state, state.day);

  const appointmentList = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>{appointmentList}</section>
    </main>
  );
}
