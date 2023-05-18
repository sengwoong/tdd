// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
// src/setupTests.js
const originalError = console.error;
console.error = (error) => {
  if (error.includes("An update to")) {
    return;
  }
  originalError.call(console, error);
};
