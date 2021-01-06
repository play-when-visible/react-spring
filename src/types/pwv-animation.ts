import { SpringConfig } from "react-spring";
import { Primitive } from "../utils/primitives";
import {
    AllowedIntersectionOptions,
    AnimationResult,
    AnimationVariant,
} from "./utility";

export interface PWVAnimationProps<P = {}> {
    /**
     * The animation to be played when the component becomes visible in the viewport. Accepts `from`, `to`, and `config`.
     */
    animation: P & {
        from: AnimationVariant;
        to: AnimationVariant;
        config?: SpringConfig;
    };

    /**
     * If true, the animation plays only once.
     */
    onlyOnce?: boolean;

    /**
     * The sensor options for `react-intersection-observer`. Read more in the [react-intersection-observer documentation](https://github.com/thebuilder/react-intersection-observer#api).
     */
    sensorOptions?: AllowedIntersectionOptions;

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
     * The primitive tag to wrap the animation around.
     */
    as?: Primitive;

    /**
     * The child function that accepts an object containing the animation props.
     *
     * @example {({ animation }) => <animated.div style={animation}>Hello!</animated.div>}
     */
    children: (result: { animation: AnimationResult }) => JSX.Element;
}
