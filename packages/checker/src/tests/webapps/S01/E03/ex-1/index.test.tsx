import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

test("renders UserBar component", async () => {
  //@ts-ignore
  const UserBar = (await import("../../../../../../tmp/src/UserBar")).default;
  const { container } = render(<UserBar />);
  expect(true).toBe(true);
});
