import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring } from "react-spring";
import {
    AnimationResult,
    HookProps,
    IntersectionObserverRef,
} from "../../types/utility";
import { PWVSpringProps } from "../../types/pwv-spring";

/**
 * Plays a spring animation when the component becomes visible in the viewport.
 */
export const usePWVSpring = ({
    animation,
    onStart,
    onRest,
    onlyOnce,
}: HookProps<PWVSpringProps>): [IntersectionObserverRef, AnimationResult] => {
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
