import React, { useState, useEffect, createContext, useContext, forwardRef, useRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";

import "./slideshow.css";

const SlideshowContext = createContext<{
  openIndex: number;
  setOpenIndex: (index: number) => void;
  setIsPaused: (isPaused: boolean) => void;
  orientation: "vertical" | "horizontal";
  count: number;
  width: number;
  height: number;
}>({
  openIndex: 0,
  setOpenIndex: () => {},
  setIsPaused: () => {},
  orientation: "vertical",
  count: 0,
  width: 0,
  height: 0,
});

const SlideshowItemContext = createContext<{
  index: number;
} | null>(null);

const slideshowVariants = cva(
  "flex w-full h-full",
  {
    variants: {
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
);

type SlideshowVariantProps = VariantProps<typeof slideshowVariants>;

export interface SlideshowRootProps extends SlideshowVariantProps, Pick<React.ComponentPropsWithoutRef<'div'>, 'id' | 'style' | 'className' | 'children'> {
  autoSlideInterval?: number;
}

export const SlideshowRoot = forwardRef<HTMLDivElement, SlideshowRootProps>(({ children, orientation = "vertical", className, autoSlideInterval = 5000, ...divProps }, ref ) => {
  const [openIndex, setOpenIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  ref = useRef<HTMLDivElement>(null);
  const compRef = ref as React.RefObject<HTMLDivElement>;
  if (!orientation) {
    orientation = "vertical";
  }

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setOpenIndex((prevIndex) => (prevIndex + 1) % React.Children.count(children));
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [isPaused, autoSlideInterval, children]);

  useEffect(() => {
    const updateDimensions = () => {
      if (compRef.current) {
        setDimensions({
          width: compRef.current.offsetWidth,
          height: compRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, [compRef, compRef.current?.offsetWidth, compRef.current?.offsetHeight]);

  return (
    <SlideshowContext.Provider value={{ openIndex, setOpenIndex, orientation, setIsPaused, count: React.Children.count(children), width: dimensions.width, height: dimensions.height }}>
      <div
        ref={compRef}
        className={slideshowVariants({ orientation , className: classNames(className, "w-full h-full text-white") })}
        role="tablist"
        aria-orientation={orientation}
        {...divProps}
      >
        {children}
      </div>
    </SlideshowContext.Provider>
  );
});
SlideshowRoot.displayName = "SlideshowRoot";

export interface SlideshowItemProps extends Pick<React.ComponentPropsWithoutRef<'div'>, 'id' | 'style' | 'className' | 'children'> {
  index: number;
  title: string;
  image?: string;
}

export const SlideshowItem: React.FC<SlideshowItemProps> = ({ index, title, image, children }) => {
  const context = useContext(SlideshowContext);
  if (!context) {
    throw new Error("SlideshowItem must be used within an SlideshowRoot");
  }
  const { openIndex, setOpenIndex, orientation, count, width, height } = context;

  const handleToggle = () => {
    setOpenIndex(index);
  };

  // const sizeAdjustment = `calc(${height}px - ${4 * (count - 1)}rem)`;

  return (
    <SlideshowItemContext.Provider value={{ index }}>
      <div
        className={classNames("overflow-hidden transition-max-height duration-300 w-full h-full relative", {
          "max-h-full": openIndex === index && orientation === "vertical",
          "max-h-16": openIndex !== index && orientation === "vertical",
          "max-w-full": openIndex === index && orientation === "horizontal",
          "max-w-16": openIndex !== index && orientation === "horizontal",
          "cursor-pointer": openIndex !== index,
        })}
        role="tab"
        aria-selected={openIndex === index}
        onClick={handleToggle}
        onMouseEnter={() => context.setIsPaused(true)}
        onMouseLeave={() => context.setIsPaused(false)}
      >      
          {image && (
          <div
            className={classNames("absolute inset-0 transition-opacity duration-300 grayscale left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2", 
                {"brightness-75": openIndex !== index}
            )}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: orientation === "vertical" ? `calc(${height}px - ${4 * (count - 1)}rem)` : `${height}px`,
              width: orientation === "horizontal" ? `calc(${width}px - ${4 * (count - 1)}rem)` : `${width}px`,
            }}
          />
        )}
        {
          <div className={classNames("absolute inset-0 bg-[#0A0016] duration-300", 
            {"opacity-75": openIndex !== index},
            {"opacity-0": openIndex === index}
          )}></div>
        }
        <div className={classNames("text-lg font-bold font-heading uppercase tracking-widest transition-all duration-300 absolute", {
          "accordion-title-vertical": orientation === "vertical",
          "accordion-title-horizontal": orientation === "horizontal",
          "opacity-0": openIndex === index,
        })}>
          {title}
        </div>
        {children}
      </div>
    </SlideshowItemContext.Provider>
  );
};

export type SlideshowContentProps = Pick<React.ComponentPropsWithoutRef<'div'>, 'id' | 'style' | 'className' | 'children'>

export const SlideshowContent: React.FC<SlideshowContentProps> = ({ children, className, ...divProps }) => {
  const context = useContext(SlideshowContext);
  const itemContext = useContext(SlideshowItemContext);
  if (!context || !itemContext) {
    throw new Error("SlideshowContent must be used within an SlideshowItem and SlideshowRoot");
  }
  const { openIndex } = context;
  const { index } = itemContext;

  return (
    <div
      className={classNames("absolute w-full h-full transition-all duration-200", className, {
        "opacity-0": openIndex !== index,
      })}
      {...divProps}
    >
      <div className="max-w-full text-wrap">
        {children}
      </div>
    </div>
  );
};

export const Slideshow = {
  Root: SlideshowRoot,
  Item: SlideshowItem,
  Content: SlideshowContent,
};
