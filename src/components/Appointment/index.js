import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

const Appointment = ({ time, interview }) => {
  return (
    <article className='appointment'>
      <Header time={time} />
      {interview ? <Show {...interview} /> : <Empty />}
    </article>
  );
};

export default Appointment;
