import { IntersectionOptions } from "react-intersection-observer";
import { AnimatedValue, UseSpringBaseProps } from "react-spring";
import { PWVAnimationProps } from "./pwv-animation";

export type AnimationResult = AnimatedValue<Pick<unknown, never>>;

export type AnimationVariant = object &
    React.CSSProperties &
    UseSpringBaseProps;

export type IntersectionObserverRef = (
    node?: Element | null | undefined
) => void;

export type AllowedIntersectionOptions = Omit<
    IntersectionOptions,
    "triggerOnce" | "onChange"
>;

export type HookProps<T extends PWVAnimationProps<unknown>> = Omit<
    T,
    "children"
>;
