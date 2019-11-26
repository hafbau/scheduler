import React, { useState } from "react";

import InterviewerList from "../InterviewerList/InterviewerList";
import Button from "../Button/Button";

const Form = props => {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {

  };

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off'>
          <input
            className='appointment__create-input text--semi-bold'
            setName={setName}
            type='text'
            placeholder='Enter Student Name'
            value={name}
            onSubmit={event => event.preventDefault()}
            onChange={e => setName(e.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button onClick={reset} danger>
            Cancel
          </Button>
          <Button confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
