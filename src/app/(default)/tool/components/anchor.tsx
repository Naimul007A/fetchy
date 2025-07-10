import { cn } from "@/utils";
import React from "react";

const Anchor: React.FC<React.ComponentPropsWithoutRef<"a">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <a
      className={cn("font-bold hover:underline cursor-pointer", className)}
      {...props}
    >
      {children}
    </a>
  );
};

export default Anchor;
