import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring } from "react-spring";
import { AnimationResult, IntersectionObserverRef } from "../../types";
import { PWVSpringProps } from "../../types/pwv-spring";

export const usePWVSpring = ({
    animation,
    onStart,
    onRest,
    onlyOnce,
}: Omit<PWVSpringProps, "children">): [
    IntersectionObserverRef,
    AnimationResult
] => {
    const [ref, isVisible] = useInView();
    const [hasPlayed, setPlayed] = useState(false);

    if (isVisible && !hasPlayed) setPlayed(true);

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

    return [ref, spring];
};
