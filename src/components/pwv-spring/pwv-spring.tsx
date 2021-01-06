import React, { useState } from "react";
import InView from "react-intersection-observer";
import { useSpring } from "react-spring";
import { PWVSpringProps } from "../../types/pwv-spring";

/**
 * Plays a spring animation when the component becomes visible in the viewport.
 */
export const PWVSpring = ({
    animation,
    onStart,
    onRest,
    onVisiblityChange,
    onlyOnce,
    sensorOptions,
    as,
    children,
}: PWVSpringProps) => {
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
        <InView
            as={as}
            onChange={inView => {
                setVisible(inView);

                if (onVisiblityChange) onVisiblityChange(inView);

                if (isVisible && !hasPlayed) setPlayed(true);
            }}
            {...sensorOptions}
        >
            {children({ animation: spring })}
        </InView>
    );
};
