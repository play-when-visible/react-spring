import { AnimatedValue, UseSpringBaseProps } from "react-spring";

export type AnimationResult = AnimatedValue<Pick<unknown, never>>;

export type AnimationVariant = object &
    React.CSSProperties &
    UseSpringBaseProps;

export type IntersectionObserverRef =
    | ((node?: Element | null | undefined) => void)
    | React.RefObject<unknown>;
