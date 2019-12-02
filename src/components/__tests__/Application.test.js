import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application/Application";

afterEach(cleanup);

xit("renders without crashing", () => {
  render(<Application />);
});
