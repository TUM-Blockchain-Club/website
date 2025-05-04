import React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";

import "./accordion.css";

type AccordionRootElement = React.ComponentRef<typeof RadixAccordion.Root>;
export type AccordionRootProps = 
  | (RadixAccordion.AccordionSingleProps & React.RefAttributes<HTMLDivElement>)
  | (RadixAccordion.AccordionMultipleProps & React.RefAttributes<HTMLDivElement>);

export const AccordionRoot = React.forwardRef<AccordionRootElement, AccordionRootProps>(
  (props, ref) => {
    return (
      <RadixAccordion.Root
        ref={ref}
        className={classNames("accordion-root", props.className)}
        {...props}
      >
        {props.children}
      </RadixAccordion.Root>
    );
  }
);
AccordionRoot.displayName = "AccordionRoot";

type AccordionItemElement = React.ComponentRef<typeof RadixAccordion.Item>;
export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Item> {
  value: string;
}

export const AccordionItem = React.forwardRef<AccordionItemElement, AccordionItemProps>(
  (props, ref) => {
    const { children, className, value, ...itemProps } = props;

    return (
        <RadixAccordion.Item
            ref={ref}
            className={classNames("accordion-item group", className)}
            value={value}
            {...itemProps}
        >
            <div className="accordion-item-inner">
                {children}
            </div>
        </RadixAccordion.Item>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerElement = React.ComponentRef<typeof RadixAccordion.Trigger>;
export type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>

export const AccordionTrigger = React.forwardRef<AccordionTriggerElement, AccordionTriggerProps>(
  (props, ref) => {
    const { children, className, ...triggerProps } = props;

    return (
      <RadixAccordion.Header className="accordion-header">
        <RadixAccordion.Trigger
          ref={ref}
          className={classNames("accordion-trigger", className)}
          {...triggerProps}
        >
          {children}
          <ChevronDownIcon className="accordion-chevron" aria-hidden />
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentElement = React.ComponentRef<typeof RadixAccordion.Content>;
export type AccordionContentProps = React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>

export const AccordionContent = React.forwardRef<AccordionContentElement, AccordionContentProps>(
  (props, ref) => {
    const { children, className, ...contentProps } = props;

    return (
      <RadixAccordion.Content
        ref={ref}
        className={classNames("accordion-content", className)}
        {...contentProps}
      >
        <div className="accordion-content-inner">
          {children}
        </div>
      </RadixAccordion.Content>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
