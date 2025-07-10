import { cn } from "@/utils";
import React from "react";

const Bold: React.FC<React.ComponentPropsWithoutRef<"span">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <span className={cn("font-bold", className)} {...props}>
      {children}
    </span>
  );
};

export default Bold;
