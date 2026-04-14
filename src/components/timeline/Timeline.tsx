import * as React from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { Milestone } from "@/data/timeline";

interface TimelineProps {
  milestones: Milestone[];
}

export function Timeline({ milestones }: TimelineProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 55%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-4xl">
      <div className="pointer-events-none absolute left-5 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />
      <motion.div
        className="pointer-events-none absolute left-5 top-0 w-px bg-primary md:left-1/2 md:-translate-x-1/2"
        style={{ height: lineHeight }}
        aria-hidden="true"
      />

      <ol className="relative space-y-14 md:space-y-24">
        {milestones.map((m, i) => (
          <MilestoneRow key={m.id} milestone={m} index={i} />
        ))}
      </ol>
    </div>
  );
}

function MilestoneRow({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const ref = React.useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const isEven = index % 2 === 0;

  return (
    <li ref={ref} className="relative">
      <div
        className="absolute left-5 top-2 z-10 size-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background md:left-1/2"
        aria-hidden="true"
      />

      <div className="pl-12 md:hidden">
        <MilestoneCard milestone={milestone} inView={inView} align="left" />
      </div>

      <div className="hidden grid-cols-2 gap-12 md:grid">
        {isEven ? (
          <>
            <div className="pr-8">
              <MilestoneCard
                milestone={milestone}
                inView={inView}
                align="right"
              />
            </div>
            <div aria-hidden="true" />
          </>
        ) : (
          <>
            <div aria-hidden="true" />
            <div className="pl-8">
              <MilestoneCard
                milestone={milestone}
                inView={inView}
                align="left"
              />
            </div>
          </>
        )}
      </div>
    </li>
  );
}

function MilestoneCard({
  milestone,
  inView,
  align,
}: {
  milestone: Milestone;
  inView: boolean;
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`rounded-xl border border-border bg-card/60 p-5 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40 ${
        align === "right" ? "md:text-right" : ""
      }`}
    >
      <div
        className={`mb-2 flex items-center gap-2 ${
          align === "right" ? "md:justify-end" : ""
        }`}
      >
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-primary">
          {milestone.year}
        </span>
        {milestone.tag && (
          <>
            <span className="h-px w-4 bg-border" aria-hidden="true" />
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {milestone.tag}
            </span>
          </>
        )}
      </div>
      <h3 className="text-lg font-semibold leading-tight">{milestone.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {milestone.description}
      </p>
    </motion.div>
  );
}
