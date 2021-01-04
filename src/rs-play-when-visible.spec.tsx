import React from "react";
import { render } from "@testing-library/react";
import { PlayWhenVisible } from "./rs-play-when-visible";
import { animated } from "react-spring";

describe("PlayWhenVisible", () => {
    it("should render the content from the child function", () => {
        const { getByText } = render(
            <PlayWhenVisible>
                {({ setupAnimationProps }) => (
                    <animated.div
                        {...setupAnimationProps({
                            variants: {
                                from: { opacity: 0 },
                                to: { opacity: 1 },
                            },
                        })}
                    >
                        Animation!
                    </animated.div>
                )}
            </PlayWhenVisible>
        );

        expect(getByText("Animation!")).toBeInTheDocument;
    });
});
