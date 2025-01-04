import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/components/header';
import type { HeaderProps } from '@/components/header';

const meta: Meta<typeof Header> = {
    title: 'Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const menuLinks: HeaderProps['menuLinks'] = [
    { name: 'Home', url: '#', buttonType: 'link' },
    { name: 'About', url: '#', buttonType: 'link' },
    { name: 'Events', url: '#', buttonType: 'link' },
    { name: 'Contact', url: '#', buttonType: 'primary' },
];

// Desktop version (default)
export const Desktop: Story = {
    args: {
        menuLinks,
    },
    parameters: {
        viewport: {
            defaultViewport: 'desktop',
        },
    },
};

// Mobile version
export const Mobile: Story = {
    args: {
        menuLinks,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

// With Logo version
export const WithLogo: Story = {
    args: {
        menuLinks,
        logo: 'https://via.placeholder.com/150x50',
    },
};
