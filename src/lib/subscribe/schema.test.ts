import { describe, expect, it } from "vitest";

import { subscribeSchema } from "./schema";

describe("subscribeSchema", () => {
  it("accepts a well-formed email", () => {
    const result = subscribeSchema.safeParse({ email: "alice@example.com" });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("alice@example.com");
    }
  });

  it.each([
    ["missing @", "alice.example.com"],
    ["empty string", ""],
    ["non-string", 42],
    ["missing domain", "alice@"],
    ["whitespace only", "   "],
  ])("rejects malformed input (%s)", (_label, value) => {
    const result = subscribeSchema.safeParse({ email: value });

    expect(result.success).toBe(false);
  });

  it("rejects when the email field is missing entirely", () => {
    const result = subscribeSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});
