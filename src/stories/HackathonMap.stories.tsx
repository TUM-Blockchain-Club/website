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

export const Default: Story = {}; // TODO: Add default hackathons

export const EuropeanHackathons: Story = {
  args: {
    hackathons: [
      { name: 'ETHGlobal London', coordinates: [-0.1278, 51.5074], link: "https://ethglobal.com/events/london", image: null },
      { name: 'ETHBerlin', coordinates: [13.4050, 52.5200], link: "https://ethglobal.com/events/berlin", image: null },
      { name: 'ETHParis', coordinates: [2.3522, 48.8566], link: "https://ethglobal.com/events/paris", image: null },
      { name: 'ETHLisbon', coordinates: [-9.1393, 38.7223], link: "https://ethglobal.com/events/lisbon", image: null },
      { name: 'ETHRome', coordinates: [12.4964, 41.9028], link: "https://ethglobal.com/events/rome", image: null },
    ],
    center: [8.5417, 47.3769], // Zurich coordinates
    centerName: 'Zurich',
  },
};

export const AsianHackathons: Story = {
  args: {
    hackathons: [
      { name: 'ETHSingapore', coordinates: [103.8198, 1.3521], link: "https://ethglobal.com/events/singapore", image: null },
      { name: 'ETHTokyo', coordinates: [139.6917, 35.6895], link: "https://ethglobal.com/events/tokyo", image: null },
      { name: 'ETHSeoul', coordinates: [126.9780, 37.5665], link: "https://ethglobal.com/events/seoul", image: null },
      { name: 'ETHHongKong', coordinates: [114.1694, 22.3193], link: "https://ethglobal.com/events/hongkong", image: null },
      { name: 'ETHBangkok', coordinates: [100.5018, 13.7563], link: "https://ethglobal.com/events/bangkok", image: null },
    ],
    center: [121.4737, 31.2304], // Shanghai coordinates
    centerName: 'Shanghai',
  },
};

export const AmericanHackathons: Story = {
  args: {
    hackathons: [
      { name: 'ETHDenver', coordinates: [-104.9903, 39.7392], link: "https://ethglobal.com/events/denver", image: null },
      { name: 'ETHNewYork', coordinates: [-74.0060, 40.7128], link: "https://ethglobal.com/events/newyork", image: null },
      { name: 'ETHSanFrancisco', coordinates: [-122.4194, 37.7749], link: "https://ethglobal.com/events/sanfrancisco", image: null },
      { name: 'ETHMiami', coordinates: [-80.1918, 25.7617], link: "https://ethglobal.com/events/miami", image: null },
      { name: 'ETHToronto', coordinates: [-79.3832, 43.6532], link: "https://ethglobal.com/events/toronto", image: null },
    ],
    center: [-87.6298, 41.8781], // Chicago coordinates
    centerName: 'Chicago',
  },
};

export const CustomHackathon: Story = {
  args: {
    hackathons: [
      { name: 'Custom Hackathon 1', coordinates: [13.4050, 52.5200], link: "https://ethglobal.com/events/berlin", image: null },
      { name: 'Custom Hackathon 2', coordinates: [2.3522, 48.8566], link: "https://ethglobal.com/events/paris", image: null },
    ],
    center: [8.5417, 47.3769],
    centerName: 'Home Base',
  },
};
