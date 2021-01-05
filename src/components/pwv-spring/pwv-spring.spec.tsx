import React from "react";
import { render } from "@testing-library/react";
import { PWVSpring } from "./pwv-spring";
import { animated } from "react-spring";

jest.mock("react-intersection-observer", () => ({ children }) => children);

describe("PWVSpring", () => {
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
