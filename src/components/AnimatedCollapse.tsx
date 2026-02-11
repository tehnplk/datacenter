"use client";

import { useRef, useEffect, useState } from "react";

interface AnimatedCollapseProps {
  open: boolean;
  children: React.ReactNode;
  duration?: number;
}

export default function AnimatedCollapse({
  open,
  children,
  duration = 200,
}: AnimatedCollapseProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(open ? "auto" : 0);
  const [overflow, setOverflow] = useState(open ? "visible" : "hidden");
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const el = contentRef.current;
    if (!el) return;

    if (open) {
      const scrollH = el.scrollHeight;
      setHeight(scrollH);
      setOverflow("hidden");
      const timer = setTimeout(() => {
        setHeight("auto");
        setOverflow("visible");
      }, duration);
      return () => clearTimeout(timer);
    } else {
      const scrollH = el.scrollHeight;
      setHeight(scrollH);
      setOverflow("hidden");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeight(0);
        });
      });
    }
  }, [open, duration]);

  return (
    <div
      ref={contentRef}
      style={{
        height: height === "auto" ? "auto" : `${height}px`,
        overflow,
        transition: `height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
        opacity: height === 0 ? 0 : 1,
      }}
    >
      {children}
    </div>
  );
}
