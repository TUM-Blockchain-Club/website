import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ChevronRightIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const CTA: Story = {
  args: {
    buttonType: 'cta',
    children: 'Call to Action',
  },
};

export const CTAWithIcon: Story = {
  args: {
    buttonType: 'cta',
    children: 'Call to Action',
    Icon: ChevronRightIcon,
  },
};


export const Primary: Story = {
  args: {
    buttonType: 'primary',
    children: 'Primary',
  },
};

export const PrimaryWithButton: Story = {
  args: {
    buttonType: 'primary',
    children: 'Primary',
    Icon: ChevronRightIcon,
  },
};

export const Secondary: Story = {
  args: {
    buttonType: 'secondary',
    children: 'Secondary',
    Icon: ChevronRightIcon,
  },
};

export const Link: Story = {
  args: {
    buttonType: 'link',
    children: 'Link',
  },
};
