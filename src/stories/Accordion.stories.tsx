import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from '@/components/accordion';

// Define the accordion with more specific props to avoid type issues
const SingleAccordion = (props: { className?: string }) => (
  <Accordion.Root type="single" collapsible className={`w-[400px] ${props.className || ''}`}>
    <Accordion.Item value="item-1">
      <Accordion.Trigger>What is C24?</Accordion.Trigger>
      <Accordion.Content>
        C24 is a global technology conference focusing on the future of computing, 
        bringing together experts from around the world.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-2">
      <Accordion.Trigger>When is the next event?</Accordion.Trigger>
      <Accordion.Content>
        Our next event is scheduled for the fall of 2024. Exact dates will be 
        announced soon.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-3">
      <Accordion.Trigger>How can I participate?</Accordion.Trigger>
      <Accordion.Content>
        You can participate by registering for the event on our website. 
        There are options for in-person and virtual attendance.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

const MultipleAccordion = (props: { className?: string }) => (
  <Accordion.Root type="multiple" className={`w-[400px] ${props.className || ''}`}>
    <Accordion.Item value="item-1">
      <Accordion.Trigger>Is registration required?</Accordion.Trigger>
      <Accordion.Content>
        Yes, registration is required for all attendees. Early registration provides
        discounted rates.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-2">
      <Accordion.Trigger>Are there speaking opportunities?</Accordion.Trigger>
      <Accordion.Content>
        Yes, we welcome speaker applications. Please visit our website for details on
        how to submit your proposal.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-3">
      <Accordion.Trigger>Where will the event be held?</Accordion.Trigger>
      <Accordion.Content>
        The event will be held at the International Convention Center in Silicon Valley.
        Virtual attendance options will also be available.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

// Use a component that doesn't require args in stories
const meta = {
  title: 'Accordion',
  component: SingleAccordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SingleAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const Multiple: Story = {
  render: () => <MultipleAccordion />,
  args: {}
};
