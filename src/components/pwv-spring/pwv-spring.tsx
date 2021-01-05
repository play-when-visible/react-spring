import React, { useState } from "react";
import { useSpring } from "react-spring";
import VisibilitySensor from "react-visibility-sensor";
import { PlayWhenVisibleProps } from "../../types/pwv-spring";

/**
 * Plays a spring animation when the component becomes visible in the viewport.
 */
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
