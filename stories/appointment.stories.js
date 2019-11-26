import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Appointment from "../src/components/Appointment";
import Header from "../src/components/Appointment/Header";
import Empty from "../src/components/Appointment/Empty";
import Show from "../src/components/Appointment/Show";
import Confirm from "../src/components/Appointment/Confirm";
import Status from "../src/components/Appointment/Status";
import Error from "../src/components/Appointment/Error";
import Form from "../src/components/Appointment/Form";

import { interviewer, interviewers } from "./data";

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time='12pm' />)
  .add("Header", () => <Header time='12pm' />)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () => (
    <Show
      interviewer={interviewer}
      student={"Lydia Miller-Jones"}
      onEdit={action("onEdit")}
      onDelete={action("onDelete")}
    />
  ))
  .add("Confirm", () => (
    <Confirm
      message={"Delete the appointment?"}
      onConfirm={action("onConfirm")}
      onCancel={action("onCalcel")}
    />
  ))
  .add("Status", () => <Status message='Deleting' />)
  .add("Error Saving", () => (
    <Error
      message='Could not delete appointment.'
      onClose={action("onClose")}
    />
  ))
  .add("Error Deleting", () => (
    <Error
      message='Could not delete appointment.'
      onClose={action("onClose")}
    />
  ))
  .add("Create", () => (
    <Form
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCalcel")}
    />
  ))
  .add("Edit", () => (
    <Form
      name={"Student name"}
      interviewers={interviewers}
      interviewer={3}
      onSave={action("onSave")}
      onCancel={action("onCalcel")}
    />
  ));
