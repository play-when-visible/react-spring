import { render } from "@testing-library/react";
import React from "react";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import { animated } from "react-spring";
import { usePWVSpring } from "./use-pwv-spring";

describe("usePWVSpring", () => {
    beforeEach(() => {
        const mockIntersectionObserver = jest.fn();

        mockIntersectionObserver.mockReturnValue({
            observe: () => null,
            unobserve: () => null,
            disconnect: () => null,
        });

        window.IntersectionObserver = mockIntersectionObserver;
    });

    const TestComponent = () => {
        const [ref, animation] = usePWVSpring({
            animation: {
                from: {
                    display: "none",
                },
                to: {
                    display: "visible",
                },
            },
        });

        return (
            <animated.div ref={ref} style={animation}>
                Test Text
            </animated.div>
        );
    };

    it("should watch the the component", () => {
        const { getByText } = render(<TestComponent />);

        mockAllIsIntersecting(true);

        expect(getByText(/test text/i)).toBeInTheDocument;
    });

    // it("should only play once", () => {
    //     const { getByText } = render(<TestComponent />);

    //     expect(getByText("Test Text")).toBeInTheDocument;
    // });
});
