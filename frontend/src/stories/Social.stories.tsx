import { Social } from '@/components/social';
import { faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
    title: 'Social Button',
    component: Social,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className='flex flex-row'>
                <div className='bg-accent w-20 h-20 flex items-center justify-center'>
                    <Story/>
                </div>
                <div className='w-20 h-20 flex items-center justify-center'>
                    <Story/>
                </div>
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        href: "#",
        icon: faXTwitter,
        title: "X"
    }
}