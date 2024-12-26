import { withThemeByDataAttribute } from '@storybook/addon-themes'

import '../src/app/globals.css';
import './preview.css';

import type { Preview, ReactRenderer } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute<ReactRenderer>({
        themes: {
            Light: 'light',
            Dark: 'dark',
        },
        defaultTheme: 'Dark',
        attributeName: 'data-mode',
    }),
],

};

export default preview;
