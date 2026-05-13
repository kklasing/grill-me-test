import { eq } from "drizzle-orm";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { db } from "@/lib/db/client";
import { subscribers } from "@/lib/db/schema";

import { initialSubscribeState, subscribe } from "./action";

describe("subscribe action (integration)", () => {
  beforeEach(async () => {
    await db.delete(subscribers);
  });

  afterAll(async () => {
    await db.delete(subscribers);
  });

  it("returns success state and persists a row given valid FormData", async () => {
    const email = "action-spec@example.com";
    const formData = new FormData();
    formData.append("email", email);

    const state = await subscribe(initialSubscribeState, formData);

    expect(state).toEqual({ status: "success" });

    const rows = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email));
    expect(rows).toHaveLength(1);
    expect(rows[0]?.email).toBe(email);
  });

  it("returns error state and does not persist a row given malformed FormData", async () => {
    const formData = new FormData();
    formData.append("email", "not-an-email");

    const state = await subscribe(initialSubscribeState, formData);

    expect(state).toEqual({ status: "error" });

    const rows = await db.select().from(subscribers);
    expect(rows).toHaveLength(0);
  });
});
