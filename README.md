# @play-when-visible/react-spring

An npm package for playing React Spring animations when they become visible in the viewport.

## Features

-   🎣 **Hooks Support**
-   🎥 **Render Props Support**
-   🛠 **Typescript Support**
-   ⚙ **Highly Configurable**
-   🙂 **Easy to Use**

## Installation

Install the package via your favorite package manager.

```
npm install @play-when-visible/react-spring

or

yarn add @play-when-visible/react-spring
```

Make sure to also have react-spring included in your project.

```
npm install react-spring

or

yarn add react-spring
```

## Usage

### Hooks API

`@play-when-visible/react-spring` provides a set of hooks prefixed with `usePWV` to create animations. The hooks return a tuple `[ref, animation]` that contains the ref the animation. For example...

```js
import React from "react";
import { animated } from "react-spring";
import { usePWVSpring } from "@play-when-visible/react-spring";

const Page = () => {
    const [ref, animation] = usePWVSpring({
        animation: {
            from: {
                opacity: 0,
            },
            to: {
                opacity: 1,
            },
            config: {
                tension: 50,
                velocity: 12,
            },
        },
    });

    return (
        <animated.div ref={ref} style={animation}>
            Hello World!
        </animated.div>
    );
};
```

### Render Props API

`@play-when-visible/react-spring` provides a set of components prefixed with `PWV` to create animations. They work by taking in a child function that passes an object in containing the animation. For example...

```js
import React from "react";
import { animated } from "react-spring";
import { PWVSpring } from "@play-when-visible/react-spring";

const Page = () => {
    return (
        <PWVSpring
            animation={{
                from: {
                    opacity: 0,
                },
                to: {
                    opacity: 1,
                },
                config: {
                    tension: 50,
                    velocity: 12,
                },
            }}
        >
            {({ animation }) => (
                <animated.div style={animation}>Hello World!</animated.div>
            )}
        </PWVSpring>
    );
};
```

## API

_This table applies to both the Hooks API and the Render Props API._

| Prop               | Default Value | Required | Description                                                                                                                                                                        |
| ------------------ | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation          | undefined     | true     | The animation to be played when the component becomes visible in the viewport. Accepts `from`, `to`, and `config`.                                                                 |
| onlyOnce           | false         | false    | If true, the animation plays only once.                                                                                                                                            |
| sensorOptions      | undefined     | false    | The sensor options for `react-intersection-observer`. Read more in the [react-intersection-observer documentation](https://github.com/thebuilder/react-intersection-observer#api). |
| onStart            | undefined     | false    | Callback for when the animation starts playing.                                                                                                                                    |
| onRest             | undefined     | false    | Callback for when the animation stops playing.                                                                                                                                     |
| onVisibilityChange | undefined     | false    | Callback for when the animation becomes visible or invisible in the viewport.                                                                                                      |

**_The Render Props API requires a child function..._** `{( animation }) => (...your jsx here)}`.
