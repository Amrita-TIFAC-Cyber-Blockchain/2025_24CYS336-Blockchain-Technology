import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative">
        <Zap className={cn(
          "animate-spin text-primary",
          sizeClasses[size]
        )} />
        <div className={cn(
          "absolute inset-0 rounded-full bg-gradient-energy-primary opacity-30 animate-pulse",
          sizeClasses[size]
        )} />
      </div>
    </div>
  );
}