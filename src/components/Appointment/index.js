import React from "react";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

const Appointment = ({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview
}) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition("SAVING");
    bookInterview(id, interview)
      .then(() => transition("SHOW"))
      .catch(err => console.log(err));
  };

  const onDelete = () => {
    transition("DELETING");
    cancelInterview(id)
      .then(() => transition("EMPTY"))
      .catch(err => console.log(err));
  };

  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition("CONFIRM")}
        />
      )}
      {mode === CREATE && (
        <Form
          onCancel={() => back()}
          interviewers={interviewers}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => transition("SHOW")}
          onConfirm={onDelete}
        />
      )}
    </article>
  );
};

export default Appointment;
