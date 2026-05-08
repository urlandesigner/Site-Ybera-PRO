"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type StickyScrollItem = {
  title: string;
  description: string;
  content?: React.ReactNode;
  contentKey?: React.Key;
  icon?: React.ReactNode;
};

export const StickyScroll = ({
  content,
  mode = "list",
  header,
  stickyClassName,
  gridClassName,
  className,
  listClassName,
  itemClassName,
  itemContentClassName,
  activeItemClassName,
  inactiveItemClassName,
  contentClassName,
}: {
  content: StickyScrollItem[];
  mode?: "list" | "single";
  header?: React.ReactNode;
  stickyClassName?: string;
  gridClassName?: string;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  itemContentClassName?: string;
  activeItemClassName?: string;
  inactiveItemClassName?: string;
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const renderCard = (item: StickyScrollItem, index: number) => (
    <motion.article
      key={item.title + index}
      initial={{
        opacity: 0.72,
      }}
      animate={{
        opacity: activeCard === index ? 1 : 0.72,
      }}
      className={cn(
        "rounded-md transition-shadow",
        itemClassName,
        activeCard === index ? activeItemClassName : inactiveItemClassName,
      )}
    >
      <div className={cn("p-4", itemContentClassName)}>
        <div className="flex flex-col gap-6">
          {item.icon ? <div>{item.icon}</div> : null}
          <div className="flex flex-col gap-1.5">
            <motion.h2
              initial={{
                opacity: 0.72,
              }}
              animate={{
                opacity: activeCard === index ? 1 : 0.72,
              }}
              className="text-2xl font-bold"
            >
              {item.title}
            </motion.h2>
            <motion.p
              initial={{
                opacity: 0.72,
              }}
              animate={{
                opacity: activeCard === index ? 1 : 0.72,
              }}
              className="max-w-sm"
            >
              {item.description}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.article>
  );

  return (
    <div
      className={cn(
        "relative rounded-md",
        className,
      )}
      ref={ref}
      style={{ position: "relative" }}
    >
      <div className={cn(stickyClassName)}>
        {header}
        <div className={cn("grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]", gridClassName)}>
          <div className={cn("relative flex flex-col gap-6", listClassName)}>
            {mode === "single" ? (
              <>
                <div className="hidden lg:block">
                  {renderCard(content[activeCard], activeCard)}
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
                  {content.map((item, index) => renderCard(item, index))}
                </div>
              </>
            ) : (
              content.map((item, index) => renderCard(item, index))
            )}
          </div>
          <div
            className={cn(
              "hidden min-w-0 overflow-hidden rounded-md lg:block",
              contentClassName,
            )}
          >
            <React.Fragment key={content[activeCard].contentKey ?? content[activeCard].title}>
              {content[activeCard].content ?? null}
            </React.Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};
