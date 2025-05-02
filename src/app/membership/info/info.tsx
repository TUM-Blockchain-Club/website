"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/button";
import { CalendarHeart, Users, Trophy, Lightbulb, Code, BookText } from "lucide-react";
import { Fragment, HTMLAttributes, ReactNode } from "react";


type CardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children: ReactNode;
};

export const Card = ({ className = "", children, ...props }: CardProps) => (
  <div
    className={`rounded-2xl overflow-hidden border border-white/10 bg-white/5 ${className}`}
    {...props}
  >
    {children}
  </div>
);

type CardContentProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children: ReactNode;
};

export const CardContent = ({ className = "", children, ...props }: CardContentProps) => (

  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const dates = [
  { title: "Application Start", date: "Wednesday, 16 April 2025", time: "—" },
  { title: "Online Info Event", date: "Tuesday, 6 May 2025", time: "19:00" },
  { title: "Application End", date: "Wednesday, 14 May 2025", time: "23:59" },
  { title: "Acceptance Notification", date: "Monday, 26 May 2025", time: "—" },
  { title: "Mandatory Welcome Meeting", date: "Thursday, 29 May 2025", time: "19:00" },
  { title: "Kick‑off Weekend (mandatory)", date: "Fri 6 – Sun 8, Jun 2025", time: "in‑person" },
];

const stats = [
    { value: "50+", label: "Core Team Members" },
    { value: "10+", label: "Events Organized" },
    { value: "2000+", label: "Student Reach" },
  ];

const awaits = [
  { icon: Trophy, label: "Hackathons", desc: "• 10× wins \n • $30k+ prize money \n • 10+ countries" },
  { icon: Users, label: "Events & Conferences", desc: "TUM Blockchain Conference \n with 1 000+ attendees & \n 100+ speakers" },
  { icon: Lightbulb, label: "Industry Projects", desc: "Real‑world blockchain projects \n with major partners" },
  { icon: BookText, label: "Research Group", desc: "Explore tech shaping the \n next decade of blockchain" },
  { icon: CalendarHeart, label: "Paper Club & Teaching", desc: "Discuss latest papers, design lectures & workshops" },
  { icon: Code, label: "Web3 Dev Projects", desc: "NFT memberships, DAO delegations & more" },
];

const criteria = [
  "You are enrolled at a university or in an apprenticeship",
  "You burn for blockchain ⚡️",
  "You commit to being an active community member",
  "You join one of our departments for ≥ 2 semesters",
];

export default function MembershipInfo() {
  return (
    <div className="w-full text-white overflow-x-hidden font-sans">
      {/* Star overlay */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),rgba(255,255,255,0)_70%)]"></div>

      <header className="lg:pb-28 relative z-10 flex flex-col items-center justify-center px-4 pt-24 pb-12 text-center">
      <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-accent text-center uppercase font-heading font-bold tracking-widest pb-4"
        >
          Shape the future of Web3
        </motion.p>
      
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl lg:text-5xl font-heading font-bold bg-clip-text text-foreground"
        >
          Participate Directly
        </motion.h1>
      </header>

      {/* Community statistics */}
      <section className="relative z-10 px-4 md:px-12 lg:px-24 pb-20">
        <h2 className="pb-4 text-2xl lg:text-4xl font-heading font-bold mb-2 text-foreground drop-shadow">
          Community Statistics
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="bg-[#1d1b36]/70 shadow-lg h-[160px] flex items-center justify-center text-center">
                <CardContent className="p-6 items-center space-y-2 flex flex-col justify-center">
                  <p className="text-4xl font-bold text-foreground font-heading">
                    {value}
                  </p>
                  <p className="text-sm text-white font-body">
                    {label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Important dates */}
      <section className="relative z-10 px-4 md:px-12 lg:px-24 pb-20">
        <h2 className="text-2xl lg:text-4xl font-heading font-bold mb-8 text-foreground drop-shadow">
          Most important dates
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dates.map(({ title, date, time }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="bg-[#1d1b36]/70 backdrop-blur-md border h-[200px]"> 
                <CardContent className="p-6 items-start space-y-4">
                  <p className="absolute top-4 text-foreground font-medium tracking-wide text-sm font-heading">
                    {title}
                  </p>
                  <p className="pt-8 text-xl font-semibold text-white font-body">
                    {date.split(",").map((line, idx) => (
                        <Fragment key={idx}>
                        {line.trim()}
                        {idx === 0 && <br />}
                        </Fragment>
                    ))}
                    </p>
                  {time !== "—" && (
                    <p className="absolute top-25 text-sm text-white font-body">{time}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What awaits you */}
      <section className="relative z-10 px-4 md:px-12 lg:px-24 pb-20">
        <h2 className="text-2xl lg:text-4xl font-heading font-bold mb-8 text-foreground drop-shadow">
          What awaits you
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {awaits.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="bg-[#1d1b36]/70 backdrop-blur-md h-[240px] flex items-center">
                <CardContent className="p-6 items-start space-y-4">
                  <Icon size={32} className="text-foreground absolute top-6" />
                  <h3 className="text-lg font-semibold text-white font-heading absolute top-1/4">{label}</h3>
                  <p className="text-sm text-white leading-relaxed font-body absolute top-1/2">
                  {desc.split("\n").map((line, idx, array) => (
                        <Fragment key={idx}>
                        {line.trim()}
                        {idx < array.length - 1 && <br />}
                        </Fragment>
                    ))}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Admission criteria */}
      <section className="relative z-10 px-4 md:px-12 lg:px-24 pb-20">
        <h2 className="text-2xl lg:text-4xl font-heading font-bold mb-8 text-foreground drop-shadow">
          Admission criteria
        </h2>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
          }}
          className="space-y-4 list-disc list-inside text-white max-w-3xl font-body"
        >
          {criteria.map((c) => (
            <motion.li key={c} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
              {c}
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* CTAs */}
      <section className="relative z-10 flex flex-col items-center justify-center pb-24 px-4 text-center space-y-8">
        <p className="max-w-xl text-lg md:text-xl text-white font-body">
          Does this excite you? Are you ready to commit to an ambitious blockchain community?
        </p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Button buttonType="primary" className="px-12 py-4 text-lg">
            APPLY NOW
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
