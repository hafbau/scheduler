import React, { useState } from "react";

import InterviewerList from "../InterviewerList/InterviewerList";
import Button from "../Button/Button";

const Form = props => {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Choose an interviewer please");
      return;
    }

    setError("");
    props.onSave(name, interviewer);
  };

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={event => event.preventDefault()}>
          <input
            className='appointment__create-input text--semi-bold'
            type='text'
            placeholder='Enter Student Name'
            value={name}
            onChange={e => setName(e.target.value)}
            data-testid='student-name-input'
          />
        </form>
        <section className='appointment__validation'>{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={e => validate()} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
