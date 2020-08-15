import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import TestBasic from "./components/TestBasic";
import { testRenderer } from "react-test-renderer";

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test("Basic Test Component Mounts Correctly", () => {
    const component_key = "test-component-1",
        component_text = "Hello there mang";
    act(() => {
        render(<TestBasic storageKey={component_key} text={component_text}/>, container);
    });

    expect(container.textContent).toBe(component_text)
});