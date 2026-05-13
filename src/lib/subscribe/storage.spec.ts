import { eq } from "drizzle-orm";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { db } from "@/lib/db/client";
import { subscribers } from "@/lib/db/schema";

import { addSubscriber } from "./storage";

describe("addSubscriber (integration)", () => {
  beforeEach(async () => {
    await db.delete(subscribers);
  });

  afterAll(async () => {
    await db.delete(subscribers);
  });

  it("inserts a row that can be read back from the same Postgres", async () => {
    const email = "storage-spec@example.com";

    await addSubscriber(email);

    const rows = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email));

    expect(rows).toHaveLength(1);
    expect(rows[0]?.email).toBe(email);
    expect(rows[0]?.id).toEqual(expect.any(String));
    expect(rows[0]?.createdAt).toBeInstanceOf(Date);
  });
});
