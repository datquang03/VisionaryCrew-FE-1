/* eslint-disable no-unused-vars */


import { cn } from "../../lib/utils";
import React, { useState, createContext, useContext, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import gsap from "gsap";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-full px-2 py-2 hidden md:flex md:flex-col bg-gradient-to-br from-neutral-50 to-neutral-800 dark:from-neutral-700 dark:to-neutral-900 w-[300px] shrink-0",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}>
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-2 py-2 flex flex-row md:hidden items-center justify-between bg-gradient-to-br from-neutral-50 to-neutral-800 dark:from-neutral-700 dark:to-neutral-900 "
        )}
        {...props}>
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-gradient-to-br from-neutral-50 to-neutral-800 dark:from-neutral-700 dark:to-neutral-900 p-4 z-[100] flex flex-col",
                className
              )}>
              <div
                className="absolute right-4 top-4 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}>
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}) => {
  const { open, animate } = useSidebar();
  const linkRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(bgRef.current, {
      width: "100%",
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to([textRef.current, iconRef.current], {
      color: "#000000", // text & icon -> black
      duration: 0.2
    });
  };

  const handleMouseLeave = () => {
    gsap.to(bgRef.current, {
      width: "0%",
      duration: 0.3,
      ease: "power2.inOut"
    });

    gsap.to([textRef.current, iconRef.current], {
      color: "#e5e7eb", // tailwind gray-200
      duration: 0.2
    });
  };

  return (
    <a
      href={link.href}
      ref={linkRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden flex items-center gap-2 py-2 px-3 group/sidebar rounded-2xl mb-2",
        className
      )}
      {...props}
    >
      {/* Background Hover Layer */}
      <div
        ref={bgRef}
        className="absolute left-0 top-0 h-full bg-white z-0"
        style={{ width: "0%" }}
      />

      {/* Icon */}
      <div
        ref={iconRef}
        className="relative z-10 text-neutral-200 text-2xl transition-colors duration-150"
      >
        {link.icon}
      </div>

      {/* Label */}
      <motion.span
        ref={textRef}
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="relative z-10 text-sm text-neutral-200 transition-colors duration-150 whitespace-pre"
      >
        {link.label}
      </motion.span>
    </a>
  );
};
