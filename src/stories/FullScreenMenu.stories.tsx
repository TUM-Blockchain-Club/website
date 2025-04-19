import type { Meta, StoryObj } from '@storybook/react';
import { FullScreenMenu, MenuProps } from '@/components/header';

const meta: Meta<typeof FullScreenMenu> = {
  title: 'FullScreenMenu',
  component: FullScreenMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const menuLinks: MenuProps['menuLinks'] = [
  { name: 'Home', url: '#', buttonType: 'link' },
  { name: 'About', url: '#', buttonType: 'link' },
  { name: 'Contact', url: '#', buttonType: 'primary' },
];

export const Default: Story = {
  args: {
    menuLinks,
  },
};
