import type { Meta, StoryObj } from '@storybook/react';
import { ThreeJSGlobe } from '@/components/globe';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'ThreeJSGlobe',
  component: ThreeJSGlobe,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ThreeJSGlobe />,
};
