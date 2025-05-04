import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionRootProps } from '@/components/slideshow';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
interface AccordionStoryArgs extends AccordionRootProps { 
  width: number;
  height: number;
}

const meta = {
  title: 'Accordion',
  component: Accordion.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
  },
} satisfies Meta<AccordionStoryArgs>;

export default meta;
type Story = StoryObj<AccordionStoryArgs>;

const items = [
  { title: 'Item 1', content: 'Content 1', image: 'https://unsplash.com/photos/yQAuEZ6q2yo/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM1MzMwMTM0fA&force=true&w=1920' },
  { title: 'Item 2', content: 'Content 2', image: 'https://unsplash.com/photos/k0wXEWatFyc/download?ixid=M3wxMjA3fDB8MXxhbGx8MjB8fHx8fHx8fDE3MzUzMjYwODZ8&force=true&w=1920' },
  { title: 'Item 3', content: 'Content 3', image: 'https://unsplash.com/photos/pz67hBsfbJ4/download?ixid=M3wxMjA3fDF8MXxhbGx8MzF8fHx8fHx8fDE3MzUzMjk5Mjd8&force=true&w=1920' },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Vertical: Story = {
  render: (args) => (
    <div className="block" style={{ width: args.width + "px", height: args.height + "px" }}>
      <Accordion.Root orientation={"vertical"}>
        {items.map((item, index) => (
          <Accordion.Item key={index} index={index} title={item.title} image={item.image}>
            <Accordion.Content>
              {item.content}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  ),
  args: {
    orientation: 'vertical',
    width: 300,
    height: 500,
  },
};

export const Horizontal: Story = {
  render: (args) => (
    <div className="block" style={{ width: args.width + "px", height: args.height + "px" }}>
      <Accordion.Root orientation={"horizontal"}>
        {items.map((item, index) => (
          <Accordion.Item key={index} index={index} title={item.title} image={item.image}>
            <Accordion.Content>
              <div className='absolute w-full overflow-x-hidden h-full bottom-0 left-0 z-10 p-4 flex items-end' style={{ background: 'linear-gradient(0deg, rgba(10, 0, 22, 0.75) 30%, rgba(10, 0, 22, 0.00) 100%)' }}>
                <div className='flex min-w-96 w-96 flex-col gap-4 justify-end'>
                  <h3 className='font-heading font-bold text-xl'>{item.content}</h3>
                  <p className='text-md'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Expedita perferendis, aperiam minima tempore ipsa quas dicta consequatur nulla velit
                  </p>
                  
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  ),
  args: {
    orientation: 'horizontal',
    width: 720,
    height: 300,
  },
};