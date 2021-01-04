import React from "react";
import { render } from "@testing-library/react";
import { PWVSpring } from "./rs-play-when-visible";
import { animated } from "react-spring";

describe("PlayWhenVisible", () => {
    it("should render the content from the child function", () => {
        const { getByText } = render(
            <PWVSpring
                animation={{
                    from: {
                        opacity: 0,
                    },
                    to: {
                        opacity: 1,
                    },
                }}
            >
                {({ animation }) => (
                    <animated.div style={animation}>Animation!</animated.div>
                )}
            </PWVSpring>
        );

        expect(getByText("Animation!")).toBeInTheDocument;
    });
});
