import React, { CSSProperties, useState } from "react";
import { animated, useSpring, UseSpringBaseProps } from "react-spring";
import VisibilitySensor from "react-visibility-sensor";

type Inputs = object & React.CSSProperties & UseSpringBaseProps;

interface SetupAnimationPropsArgs {
    variants: {
        from: Inputs;
        to: Inputs;
    };
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
    children: (args: ChildrenArgs) => JSX.Element;
}

export const PlayWhenVisible = ({
    onVisiblityChange,
    onlyOnce,
    requireFullVisibility,
    sensorOptions,
    children,
}: PlayWhenVisibleProps) => {
    const [isVisible, setVisible] = useState(false);
    const [hasPlayed, setPlayed] = useState(false);

    const setupAnimationProps = ({ variants }: SetupAnimationPropsArgs) => {
        const { from, to } = variants;

        return {
            style: isVisible
                ? useSpring({
                      from,
                      to,
                  })
                : undefined,
        };
    };

    return (
        <VisibilitySensor
            partialVisibility={!requireFullVisibility}
            onChange={visible => {
                if (onVisiblityChange) onVisiblityChange(visible);

                setVisible(onlyOnce ? true : visible);

                if (visible && !hasPlayed) setPlayed(true);
            }}
            {...sensorOptions}
        >
            {children({ setupAnimationProps })}
        </VisibilitySensor>
    );
};
