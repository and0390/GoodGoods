import { describe, expect, it } from "vitest";

describe("env", () => {
  it("loads DATABASE_URL", () => {
    console.log(process.env.DATABASE_URL);
    expect(process.env.DATABASE_URL).toBeDefined();
  });
});
