'use client';

import React, { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';

/**
 * FAQ data – start with a single question/answer pair.
 * You can add more entries by pushing new objects with the same shape
 * (question, answer) into this array.
 */
const faqs = [
  {
    question: 'What departments are there?',
    answer: `Education: The Education team ensures everyone in the club as well as our events and our projects stay at the cutting edge of web3. To that end, we constantly review the latest research, prepare internal and external study programs, and organize educational events.

            Community: The tasks include distributing informative as well as fun newsletters, organizing meetups, and hosting internal club events to keep our members connected and informed.

            Legal & Finance: The department oversees financial management, including budgeting and accounting, and handle legal aspects such as contracts and taxation.

            Industry: Industry is a mission-driven department that organizes web3 projects for student teams in cooperation with partners from the industry.

            IT & Development: The department's vision is to work on internal web3 projects as on building MVPs and PoCs of web3 concepts. The goal of the team is to find and integrate web3 tech into the club's daily activities. Furthermore, the club's infrastructure and, of course, the website will be taken care of our magicians.

            External Affairs: The team is tasked with expanding and nurturing the organization's network through targeted outreach and partnership development. This includes engaging with university clubs, securing and maintaining partnerships, exploring new collaboration opportunities, and fundraising for conferences.

            Marketing: The marketing team creates marketing campaigns for events and takes care of branding and content creation, a.o. for social media. We also are responsible for creating merch and marketing materials.`
  },
  {
    question: 'How many members do you have?',
    answer: 'We have over 50 active members and additional support from our advisors and alumni.'
  },
  {
    question: 'Is there any membership fee?',
    answer: 'Yes, our membership fee is 20€ per semester. Don\'t worry, you will be compensated through many other benefits through our activities 😉'
  },
  {
    question: 'What kind of study do I have to do to join the club?',
    answer: 'Any kind of study is right to join our club. The only thing that matters is your motivation and eagerness to learn more about blockchain technologies.'
  },
  {
    question: 'How much time do I have to spend for the Club?',
    answer: 'There\'s no formal time requirement for the club. However, to get the most out of the experience,  consider being actively involved in key events, discussions, and projects. It\'s also important to know that we are a team of highly motivated individuals passionate about becoming the leading student Blockchain club worldwide! While we don\'t have rigid working hours, our members consistently put in around 10 hours a week – and often much more – because the impact of our work drives them. This version focuses on motivation and dedication while subtly suggesting a level of expected commitment.  Of course, we understand that your schedule can fluctuate, and we\'ll always be flexible, especially during exam periods.'
  },
  {
    question: 'What does the application process look like?',
    answer: 'The current process of recruiting is simple, with two steps. The first step of the recruiting is the written application phase, where each candidate has to fill out a set of questions in the application form. After an initial screening of written applications, the selected candidates move on for a face-to-face interview with TUM Blockchain Club members. After the final round of interviews, the candidates who make the cut are invited to join our community.'
  },
  {
    question: 'I can\'t be there for the kickoff event, should I still apply?',
    answer: 'At the onboarding event, you will get to know all active members and new joiners and be onboarded to all IT tools. You will also learn everything you need to know about your membership and get to know the department you will be working in. That\'s why it\'s super important that you are there in person for the entire period! If you can\'t be there and have a really good reason for this, please let us know when you submit your application.'
  },
  {
    question: 'How can I reach out to the TBC?',
    answer: 'To reach out to us, you can either fill out the contact form on our website to leave your email, and we will get back to you promptly. Alternatively, you can directly email us at info@tum-blockchain.com for any inquiries.'
  }

];

/**
 * FAQ accordion component.
 * Renders each FAQ item as a Radix-UI Accordion.Item and gives fully-controlled
 * open/close state via React state. Styling mirrors the original departments
 * accordion so you can drop-in replace it.
 */
const FAQAccordion: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | undefined>();
  const accordionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="px-4 md:px-8 lg:px-16 text-white">
      {/* Page Title */}
      <div className="flex flex-col gap-2 w-full justify-center items-center mb-12">
        <h3 className="text-accent text-center uppercase font-heading font-bold tracking-widest">
          Frequently Asked Questions
        </h3>
        <h1 className="text-3xl text-center lg:text-5xl font-heading font-bold leading-tight">
          Club FAQs
        </h1>
      </div>

      {/* Accordion */}
      <Accordion.Root
        ref={accordionRef}
        type="single"
        collapsible
        value={activeItem}
        onValueChange={setActiveItem}
        className="space-y-4"
      >
        {faqs.map((faq, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="border border-accent rounded-lg overflow-hidden transition-all duration-300 bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          >
            <Accordion.Trigger
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-lg uppercase tracking-wide hover:bg-zinc-800 transition group"
            >
              {faq.question}
              <ChevronDown
                className="w-5 h-5 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent text-white"
              />
            </Accordion.Trigger>

            <Accordion.Content
              className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp p-6"
            >
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {faq.answer}
              </p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default FAQAccordion;
