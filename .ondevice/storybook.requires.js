/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from "@storybook/react-native";

import "@storybook/addon-ondevice-notes/register";
import "@storybook/addon-ondevice-controls/register";
import "@storybook/addon-ondevice-backgrounds/register";
import "@storybook/addon-ondevice-actions/register";

import { argsEnhancers } from "@storybook/addon-actions/dist/modern/preset/addArgs";

import { decorators, parameters } from "./preview";

if (decorators) {
  if (__DEV__) {
    // stops the warning from showing on every HMR
    require("react-native").LogBox.ignoreLogs([
      "`clearDecorators` is deprecated and will be removed in Storybook 7.0",
    ]);
  }
  // workaround for global decorators getting infinitely applied on HMR, see https://github.com/storybookjs/react-native/issues/185
  clearDecorators();
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

try {
  argsEnhancers.forEach((enhancer) => addArgsEnhancer(enhancer));
} catch {}

const getStories = () => {
  return [
    require("../src/components/Demo.stories.tsx"),
    require("../src/components/LinearGradient/LinearGradient.stories.tsx"),
    require("../src/designs/atoms/Button/Button.stories.tsx"),
    require("../src/designs/atoms/H1/H1.stories.tsx"),
    require("../src/designs/atoms/H2/H2.stories.tsx"),
    require("../src/designs/atoms/H3/H3.stories.tsx"),
    require("../src/designs/atoms/Input/Input.stories.tsx"),
    require("../src/designs/atoms/ProgressBar/ProgressBar.stories.tsx"),
    require("../src/designs/atoms/Tag/Tag.stories.tsx"),
    require("../src/designs/atoms/Text/Text.stories.tsx"),
    require("../src/designs/molecules/AppBar/AppBar.stories.tsx"),
  ];
};

configure(getStories, module, false);
