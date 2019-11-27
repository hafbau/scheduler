import React from "react";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = ({ time, interview }) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} />
      )}
      {mode === CREATE && <Form onCancel={() => back()} interviewers={[]} />}
    </article>
  );
};

export default Appointment;
