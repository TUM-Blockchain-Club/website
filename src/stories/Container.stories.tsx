import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "../components/container";

const meta = {
  title: "Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-blue-100 p-4 border-2 border-dashed border-blue-300">
        <p className="text-blue-800">
          This container has a maximum width of 5xl (64rem / 1024px). On screens larger than this width,
          the container will be centered with visible overflow. On smaller screens, the container will
          take up the full width with hidden overflow.
        </p>
        <div className="mt-4 flex gap-4 overflow-x-visible">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 h-40 bg-white rounded-lg shadow-md flex items-center justify-center"
            >
              Scroll Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

export const WithLongContent: Story = {
  args: {
    children: (
      <div className="bg-green-100 p-4 border-2 border-dashed border-green-300">
        <div className="flex gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-green-800 mb-4">Left Content</h2>
            <p className="text-green-700">
              This example shows how the container handles long content that might overflow horizontally.
              The content is responsive and will wrap on smaller screens.
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-green-800 mb-4">Right Content</h2>
            <p className="text-green-700">
              Try resizing the window to see how the container and its contents adapt to different
              screen sizes. Notice how the overflow behavior changes at the lg breakpoint.
            </p>
          </div>
        </div>
      </div>
    ),
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    children: (
      <section className="bg-purple-100 p-4 border-2 border-dashed border-purple-300">
        <h2 className="text-xl font-bold text-purple-800 mb-4">Container as Section</h2>
        <p className="text-purple-700">
          This example demonstrates using the Container with the asChild prop, rendering it as a
          section element instead of a div.
        </p>
      </section>
    ),
  },
};
