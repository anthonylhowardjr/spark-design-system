import React from 'react';
import SprkRevealInput from './SprkRevealInput/SprkRevealInput';

export default {
  title: 'Components/Input/Password',
  decorators: [
    story => <div className="sprk-o-Box">{story()}</div>
  ],
  component: SprkRevealInput,
  parameters: {
    jest: [
      'SprkErrorContainer',
      'SprkInputIconCheck',
    ],
    info: `
##### For design and usage information check out the [documentation.](https://spark-docs.netlify.com/using-spark/components/input)
    `,
  },
};

export const passwordInput = () => (
  <SprkRevealInput
    label="Password"
    toggleLabel="Show Password"
    name="password-1"
  />
);

passwordInput.story = {
  name: 'Default',
  parameters: {
    jest: [
      'SprkRevealInput',
    ]
  },
};
