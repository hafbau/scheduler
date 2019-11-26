import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";


import InterviewerList from "components/InterviewerList/InterviewerList";
import { interviewers } from './data';


storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("onChange")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
      onChange={action("onChange")}
    />
  ));