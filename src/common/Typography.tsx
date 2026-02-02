import React, { type ReactElement } from "react";
import { cn } from "../lib/cnUtils";

type Variant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body-lg"
  | "body"
  | "body-sm"
  | "caption"
  | "overline"
  | "code";

type Align = "left" | "center" | "right" | "justify";

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type TypographyProps = {
  /**
   * Visual style of the text.  
   * Controls font-size, font-weight, and other text styles.
   * Default: `"body"`
   */
  variant?: Variant;

  /**
   * Text alignment inside the element.
   * Default: `"left"`
   */
  align?: Align;

  /**
   * Optional font weight to override the default weight of the variant.
   * Default: Uses the variant's weight
   */
  weight?: FontWeight;

  /**
   * Additional Tailwind classes for customization
   */
  className?: string;

  /**
   * The content of the Typography. Can be string, JSX, or other React nodes.
   */
  children?: React.ReactNode;

  /**
   * If true, Typography will not render its own element.
   * Instead, it will clone and apply styles to the child element.
   * Useful for styling `<a>`, `<button>`, or custom components.
   */
  asChild?: boolean;
};

/**
 * Mapping of variants to Tailwind classes
 */
const styles: Record<Variant, string> = {
  display: "text-6xl font-bold",
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-semibold",
  "body-lg": "text-lg",
  body: "text-base",
  "body-sm": "text-sm",
  caption: "text-xs text-gray-500",
  overline: "text-[11px] uppercase tracking-wider font-semibold",
  code: "font-mono text-sm bg-gray-100 px-1 rounded",
};

/**
 * Tailwind text alignment classes
 */
const alignStyles: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

/**
 * Tailwind font-weight classes
 */
const weightMap: Record<FontWeight, string> = {
  100: "font-thin",
  200: "font-extralight",
  300: "font-light",
  400: "font-normal",
  500: "font-medium",
  600: "font-semibold",
  700: "font-bold",
  800: "font-extrabold",
  900: "font-black",
};

/**
 * Typography Component
 *
 * A flexible component to render text with consistent design system styles.
 * Supports variants, alignment, weight, and optionally rendering as a child element.
 *
 * @example
 * // Default usage
 * <Typography variant="h1">Dashboard</Typography>
 *
 * @example
 * // Override alignment
 * <Typography variant="body" align="center">
 *   Centered text
 * </Typography>
 *
 * @example
 * // Override weight
 * <Typography variant="body" weight={700}>
 *   Bold body text
 * </Typography>
 *
 * @example
 * // Use asChild to style a link without extra DOM element
 * <Typography variant="h2" asChild>
 *   <a href="/dashboard">Go to Dashboard</a>
 * </Typography>
 *
 * @example
 * // Combine all props
 * <Typography variant="overline" weight={600} align="right" asChild>
 *   <button className="px-4 py-2">Click Me</button>
 * </Typography>
 */
export function Typography({
  variant = "body",
  align = "left",
  weight,
  className,
  children,
  asChild = false,
}: TypographyProps) {
  const classes = cn(
    styles[variant],
    alignStyles[align],
    weight ? weightMap[weight] : "",
    className
  );

  // If asChild, clone the child element and inject classes
  if (asChild && React.isValidElement(children)) {
    const child = children as ReactElement<any, any>;
    return React.cloneElement(child, {
      className: cn(child.props.className, classes),
    });
  }

  // Otherwise, render default <p>
  return <p className={classes}>{children}</p>;
}
