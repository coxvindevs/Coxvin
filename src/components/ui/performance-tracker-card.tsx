'use client';
// components/ui/sleep-tracker-card.tsx
import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";

// Define TypeScript types for props for type safety and clarity
type SystemStage = "Incident" | "Recovery" | "Healthy" | "Maintenance";

interface PerformanceGraphSegment {
  stage: SystemStage;
  duration: number; // Represents proportion, e.g., flex-grow value
  height: number; // Represents percentage height (0-100)
}

export interface PerformanceData {
  timeSlept: string;
  quality: number;
  changePercent: number;
  startTime: string;
  endTime: string;
  stages: Record<SystemStage, string>;
  graphData: PerformanceGraphSegment[];
}

interface PerformanceTrackerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: PerformanceData;
  icons: {
    sleep: React.ReactNode;
    moon: React.ReactNode;
    sun: React.ReactNode;
    arrowUp: React.ReactNode;
  };
}

// Shared status colors keep the graph and its legend consistent.
const stageColors: Record<SystemStage, string> = {
  Incident: "bg-[#ff3030]",
  Recovery: "bg-[#00b8ee]",
  Healthy: "bg-[#2f80ff]",
  Maintenance: "bg-[#5935f5]",
};

// Main component definition
const PerformanceTrackerCard = React.forwardRef<
  HTMLDivElement,
  PerformanceTrackerCardProps
>(({ className, data, icons, ...props }, ref) => {
  const reducedMotion = useReducedMotion();
  const {
    timeSlept,
    quality,
    changePercent,
    startTime,
    endTime,
    stages,
    graphData,
  } = data;

  // Animation variants for the graph container and individual bars
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.05,
      },
    },
  };

  const barVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
        ...(reducedMotion ? { duration: 0 } : {}),
      },
    },
  };

  return (
    <div
      ref={ref}
      className={clsx(
        "w-full max-w-md rounded-lg border border-white/15 bg-[#202020] p-6 text-[#e8e8e3] shadow-lg",
        className
      )}
      {...props}
    >
      {/* Header Section */}
      <div className="mb-6 flex items-center gap-3">
        {icons.sleep}
        <h2 className="text-lg font-semibold">System performance</h2>
      </div>

      {/* Main Stats Section */}
      <div className="mb-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold">{timeSlept}</p>
          <p className="text-xs text-[#aaa79f]">Response time</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{quality}%</p>
          <p className="text-xs text-[#aaa79f]">Uptime</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 text-[#00d66b]">
            {icons.arrowUp}
            <p className="text-2xl font-bold">{changePercent}%</p>
          </div>
          <p className="text-xs text-[#aaa79f]">less latency</p>
        </div>
      </div>

      {/* Animated Graph Section */}
      <div
        className="rounded-lg bg-[#262626] p-4"
        aria-label="System health stages over 24 hours"
        role="figure"
      >
        <motion.div
          className="flex h-24 w-full items-end justify-center gap-px"
          variants={containerVariants}
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
        >
          {graphData.map((segment, index) => (
            <motion.div
              key={index}
              className={clsx(
                "rounded-full",
                stageColors[segment.stage]
              )}
              style={{
                flexBasis: 0,
                flexGrow: segment.duration,
                height: `${segment.height}%`,
              }}
              variants={barVariants}
              aria-label={`${segment.stage} state for a duration proportion of ${segment.duration}`}
            />
          ))}
        </motion.div>
        <div className="mt-2 flex justify-between text-xs text-[#aaa79f]">
          <div className="flex items-center gap-1.5">
            {icons.moon}
            <span>{startTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>{endTime}</span>
            {icons.sun}
          </div>
        </div>
      </div>

      {/* Legend Section */}
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
        {Object.entries(stages).map(([stage, duration]) => (
          <div key={stage} className="flex items-center gap-2">
            <span
              className={clsx(
                "h-2 w-2 rounded-full",
                stageColors[stage as SystemStage]
              )}
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium">{stage}</p>
              <p className="text-xs text-[#aaa79f]">{duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
PerformanceTrackerCard.displayName = "PerformanceTrackerCard";

export { PerformanceTrackerCard };
