import { IntersectionOptions } from "react-intersection-observer";
import { SpringConfig } from "react-spring";
import { AnimationResult, AnimationVariant } from "./";

export interface PWVSpringAnimation {
    /**
     * Initial animation state.
     */
    from: AnimationVariant;

    /**
     * End animation state.
     */
    to: AnimationVariant;

    /**
     * Animation configuration.
     */
    config?: SpringConfig;
}

export interface PWVSpringProps {
    /**
     * The animation to be played when the component becomes visible in the viewport. Accepts `from`, `to`, and `config`.
     */
    animation: PWVSpringAnimation;

    /**
     * If true, the animation plays only once.
     */
    onlyOnce?: boolean;

    /**
     * The sensor options for `react-intersection-observer`. Read more in the [react-intersection-observer documentation](https://github.com/thebuilder/react-intersection-observer#api).
     */
    sensorOptions?: Omit<IntersectionOptions, "triggerOnce" | "onChange">;

    /**
     * Callback for when the animation starts playing.
     */
    onStart?: () => void;

    /**
     * Callback for when the animation stops playing.
     */
    onRest?: (ds: Partial<unknown>) => void;

    /**
     * Callback for when the animation becomes visible or invisible in the viewport.
     */
    onVisiblityChange?: (visible: boolean) => void;

    /**
     * The child function that accepts an object containing the animation props.
     *
     * @example {({ animation }) => <animated.div style={animation}>Hello!</animated.div>}
     */
    children: (result: { animation: AnimationResult }) => JSX.Element;
}
