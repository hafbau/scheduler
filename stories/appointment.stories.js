import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Appointment from "../src/components/Appointment";
import Header from "../src/components/Appointment/Header";
import Empty from "../src/components/Appointment/Empty";
import Show from "../src/components/Appointment/Show";
import Confirm from "../src/components/Appointment/Confirm";

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

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
  ));
