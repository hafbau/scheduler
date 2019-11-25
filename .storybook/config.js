import { configure } from "@storybook/react";
import '../src/index.scss';

const req = require.context('../stories/', true, /\.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
