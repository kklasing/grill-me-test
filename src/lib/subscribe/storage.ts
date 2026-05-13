import "server-only";

import { db } from "@/lib/db/client";
import { subscribers } from "@/lib/db/schema";

export async function addSubscriber(email: string): Promise<void> {
  await db.insert(subscribers).values({ email });
}
