import React, { CSSProperties, useState } from "react";
import {
    animated,
    SpringConfig,
    useSpring,
    UseSpringBaseProps,
} from "react-spring";
import VisibilitySensor from "react-visibility-sensor";

type Inputs = object & React.CSSProperties & UseSpringBaseProps;

interface SetupAnimationPropsArgs {
    from: Inputs;
    to: Inputs;
    config?: SpringConfig;
}

interface AnimationProps {
    style: CSSProperties | undefined;
}

interface ChildrenArgs {
    /**
     * Sets up a play when visible animation based on the variants provided.
     */
    setupAnimationProps: (args: SetupAnimationPropsArgs) => AnimationProps;
}

interface PlayWhenVisibleProps {
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
     * Callback for when the visibility of the animation is changed. (Equivalent to `onChange` from the `VisibilitySensor` props)
     */
    onVisiblityChange?: (visible: boolean) => void;
    /**
     * The child function that creates the animation props.
     */
    // children: (args: ChildrenArgs) => JSX.Element;
    children: React.ReactNode;
}

export const PlayWhenVisible = ({
    animation,
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

    const finalAnimation = useSpring({
        from: from,
        to: canPlay ? to : fallbackVariant,
        config,
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
            <animated.div style={finalAnimation}>{children}</animated.div>
        </VisibilitySensor>
    );
};
