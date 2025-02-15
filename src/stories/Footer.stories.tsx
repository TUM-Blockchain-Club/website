import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../components/footer/Footer';

const meta = {
    title: 'Footer',
    component: Footer,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
    args: {},
};
