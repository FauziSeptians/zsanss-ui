"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import classNames from "@/utils/classNames";

type Direction = "top" | "bottom" | "left" | "right";

const DrawerContext = React.createContext<{ direction: Direction }>({
  direction: "bottom",
});

const Drawer = ({
  shouldScaleBackground = true,
  direction = "bottom",
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerContext.Provider value={{ direction }}>
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      direction={direction}
      {...props}
    />
  </DrawerContext.Provider>
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={classNames("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { direction } = React.useContext(DrawerContext);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={classNames(
          "fixed z-50 flex flex-col border border-gray-200 bg-white transition-all duration-300",
          direction === "bottom" && "inset-x-0 bottom-0 mt-24 h-auto rounded-t-[10px]",
          direction === "top" && "inset-x-0 top-0 mb-24 h-auto rounded-b-[10px]",
          direction === "left" && "inset-y-0 left-0 mr-24 w-[85%] sm:w-80 h-full rounded-r-[10px]",
          direction === "right" && "inset-y-0 right-0 ml-24 w-[85%] sm:w-80 h-full rounded-l-[10px]",
          className
        )}
        {...props}
      >
        {direction === "bottom" && (
          <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-gray-100" />
        )}
        {direction === "top" && (
          <div className="mx-auto mb-4 h-2 w-[100px] rounded-full bg-gray-100 order-last" />
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classNames("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classNames("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={classNames(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={classNames("text-sm text-gray-500", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
