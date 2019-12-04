import React from "react";

import "./Application.scss";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "../../helpers/selectors";
import useApplicationData from "../../hooks/useApplicationData";
import DayList from "components/DayList/DayList";
import Appointment from "components/Appointment";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  } = useApplicationData();
  
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const appointmentList = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        editInterview={editInterview}
      />
    );
  });
  
  return (
    <main className='layout'>
      <section className='sidebar'>
        <h1>Newish dummy</h1>
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
      <section className='schedule'>{appointmentList}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
