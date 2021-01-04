import React, { useState } from "react";
import {
    AnimatedValue,
    SpringConfig,
    useSpring,
    UseSpringBaseProps,
} from "react-spring";
import VisibilitySensor from "react-visibility-sensor";

type AnimationVariant = object & React.CSSProperties & UseSpringBaseProps;

interface SetupAnimationPropsArgs {
    from: AnimationVariant;
    to: AnimationVariant;
    config?: SpringConfig;
}

interface PlayWhenVisibleProps {
    /**
     *
     */
    animation: SetupAnimationPropsArgs;

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
    children: (result: {
        animation: AnimatedValue<
            Pick<
                {
                    from: unknown;
                    to: unknown;
                    config: unknown;
                },
                never
            >
        >;
    }) => JSX.Element;
}

export const PWVSpring = ({
    animation,
    onStart,
    onRest,
    onVisiblityChange,
    onlyOnce,
    requireFullVisibility,
    sensorOptions,
    children,
}: PlayWhenVisibleProps) => {
    const [isVisible, setVisible] = useState(false);
    const [hasPlayed, setPlayed] = useState(false);

    const { from, to, config } = animation;

    const canPlay = onlyOnce ? hasPlayed : isVisible;
    const fallbackVariant = onlyOnce ? (hasPlayed ? to : from) : from;

    const spring = useSpring({
        from: from,
        to: canPlay ? to : fallbackVariant,
        config,
        onStart,
        onRest,
    });

    return (
        <VisibilitySensor
            partialVisibility={!requireFullVisibility}
            onChange={visible => {
                if (onVisiblityChange) onVisiblityChange(visible);

                setVisible(visible);

                if (visible && !hasPlayed) setPlayed(true);
            }}
            {...sensorOptions}
        >
            {children({ animation: spring })}
        </VisibilitySensor>
    );
};
