import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function snakeCaseToTitleCase(str) {
  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
