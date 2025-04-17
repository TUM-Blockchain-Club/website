import React from 'react';
import { Meta, Story } from '@storybook/react';
import { rest } from 'msw';
import { userEvent, within } from '@storybook/testing-library';
import OurTeam from './Team';

export default {
  title: 'Components/OurTeam',
  component: OurTeam,
  parameters: {
    msw: [
      rest.get(
        'https://strapi.rbg.tum-blockchain.com/api/Members',
        (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json({
              data: [
                {
                  id: '1',
                  name: 'Alice Johnson',
                  departments: [{ name: 'Marketing' }],
                  profile_picture: { url: 'https://via.placeholder.com/150' },
                  social_media: [
                    { platform: 'linkedin', link: 'https://linkedin.com/in/alice' },
                    { platform: 'twitter', link: 'https://twitter.com/alice' },
                  ],
                },
                {
                  id: '2',
                  name: 'Bob Smith',
                  departments: [{ name: 'IT & Dev' }],
                  profile_picture: { url: 'https://via.placeholder.com/150' },
                  social_media: [
                    { platform: 'instagram', link: 'https://instagram.com/bob' },
                  ],
                },
              ],
            })
          )
      ),
    ],
  },
} as Meta;

const Template: Story = () => <OurTeam />;

export const Default = Template.bind({});

export const SearchAlice = Template.bind({});
SearchAlice.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = await canvas.getByPlaceholderText('Search by name...');
  await userEvent.type(input, 'Alice');
};

export const FilterMarketing = Template.bind({});
FilterMarketing.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.getByRole('button', { name: 'Marketing' });
  await userEvent.click(button);
};
