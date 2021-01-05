import { AnimatedValue, SpringConfig, UseSpringBaseProps } from "react-spring";
import { AnimationResult } from "./";
import VisibilitySensor from "react-visibility-sensor";

type AnimationVariant = object & React.CSSProperties & UseSpringBaseProps;

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
     * The spring animation that will be played when the component becomes visible in the viewport.
     */
    animation: PWVSpringAnimation;

    /**
     * If true, the animation plays only once.
     */
    onlyOnce?: boolean;

    /**
     * The props for the `VisibilitySensor` from `react-visibility-sensor`, excluding `partialVisibility` and `onChange`. Read more in the [react-visibility-sensor props documentation](https://github.com/joshwnj/react-visibility-sensor#props).
     */
    sensorOptions?: Omit<
        React.ComponentPropsWithoutRef<typeof VisibilitySensor>,
        "onChange" | "partialVisibility"
    >;

    /**
     * If true, requires that the animation children are fully visible before playing the animation. (Equivalent to `partialVisibility` from  the `VisibilitySensor` props)
     */
    requireFullVisibility?: boolean;

    /**
     * Callback for when the animation starts playing.
     */
    onStart?: () => void;

    /**
     * Callback for when the animation stops playing.
     */
    onRest?: (ds: Partial<unknown>) => void;

    /**
     * Callback for when the visibility of the animation is changed. (Equivalent to `onChange` from the `VisibilitySensor` props)
     */
    onVisiblityChange?: (visible: boolean) => void;

    /**
     * The child function that creates the animation props.
     */
    children: (result: { animation: AnimationResult }) => JSX.Element;
}
