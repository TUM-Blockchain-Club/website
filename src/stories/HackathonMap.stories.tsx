import type { Meta, StoryObj } from '@storybook/react';
import { HackathonMap } from '../components/hack_map';

const meta: Meta<typeof HackathonMap> = {
  title: 'HackathonMap',
  component: HackathonMap,  
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[1024px] h-auto">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HackathonMap>;

export const Default: Story = {};

export const EuropeanHackathons: Story = {
  args: {
    hackathons: [
      { name: 'ETHGlobal London', coordinates: [-0.1278, 51.5074] },
      { name: 'ETHBerlin', coordinates: [13.4050, 52.5200] },
      { name: 'ETHParis', coordinates: [2.3522, 48.8566] },
      { name: 'ETHLisbon', coordinates: [-9.1393, 38.7223] },
      { name: 'ETHRome', coordinates: [12.4964, 41.9028] },
    ],
    center: [8.5417, 47.3769], // Zurich coordinates
    centerName: 'Zurich',
  },
};

export const AsianHackathons: Story = {
  args: {
    hackathons: [
      { name: 'ETHSingapore', coordinates: [103.8198, 1.3521] },
      { name: 'ETHTokyo', coordinates: [139.6917, 35.6895] },
      { name: 'ETHSeoul', coordinates: [126.9780, 37.5665] },
      { name: 'ETHHongKong', coordinates: [114.1694, 22.3193] },
      { name: 'ETHBangkok', coordinates: [100.5018, 13.7563] },
    ],
    center: [121.4737, 31.2304], // Shanghai coordinates
    centerName: 'Shanghai',
  },
};

export const AmericanHackathons: Story = {
  args: {
    hackathons: [
      { name: 'ETHDenver', coordinates: [-104.9903, 39.7392] },
      { name: 'ETHNewYork', coordinates: [-74.0060, 40.7128] },
      { name: 'ETHSanFrancisco', coordinates: [-122.4194, 37.7749] },
      { name: 'ETHMiami', coordinates: [-80.1918, 25.7617] },
      { name: 'ETHToronto', coordinates: [-79.3832, 43.6532] },
    ],
    center: [-87.6298, 41.8781], // Chicago coordinates
    centerName: 'Chicago',
  },
};

export const CustomHackathon: Story = {
  args: {
    hackathons: [
      { name: 'Custom Hackathon 1', coordinates: [13.4050, 52.5200] },
      { name: 'Custom Hackathon 2', coordinates: [2.3522, 48.8566] },
    ],
    center: [8.5417, 47.3769],
    centerName: 'Home Base',
  },
};
