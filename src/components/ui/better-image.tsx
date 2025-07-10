import React from "react";
import * as BetterThings from "@prass/betterimage";
import { Loader } from "lucide-react";
import { cn } from "@/utils";

const BetterVersion = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BetterThings.Root>
>(({ className, ...props }, ref) => (
  <BetterThings.Root
    ref={ref}
    className={cn(
      "relative flex h-full w-full items-center justify-center",
      className
    )}
    {...props}
  />
));
BetterVersion.displayName = BetterThings.Root.displayName;

const Img = React.forwardRef<
  HTMLImageElement,
  React.ComponentPropsWithoutRef<typeof BetterThings.Image>
>(({ className, ...props }, ref) => (
  <BetterThings.Image
    ref={ref}
    className={cn("h-full w-full", className)}
    {...props}
  />
));
Img.displayName = BetterThings.Image.displayName;

const Fallback = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BetterThings.Fallback>
>(({ className, ...props }, ref) => (
  <BetterThings.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center", className)}
    {...props}
  >
    <Loader className="h-4 w-4 animate-spin" />
  </BetterThings.Fallback>
));
Fallback.displayName = BetterThings.Fallback.displayName;

const BetterImage = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Img> & {
    onFailString?: string;
    delay?: number;
  }
>(({ src, alt, className, onFailString, delay, ...props }, ref) => {
  return (
    <BetterVersion ref={ref}>
      <Img src={src} alt={alt} className={className} {...props} />
      <Fallback onFailString={onFailString} delay={delay} />
    </BetterVersion>
  );
});
BetterImage.displayName = "BetterImage";

export { BetterVersion, Img, Fallback, BetterImage };
