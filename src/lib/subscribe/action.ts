"use server";

import { addSubscriber } from "./storage";
import { subscribeSchema } from "./schema";

export type SubscribeState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error" };

export const initialSubscribeState: SubscribeState = { status: "idle" };

export async function subscribe(
  _previousState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const parsed = subscribeSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { status: "error" };
  }

  await addSubscriber(parsed.data.email);
  return { status: "success" };
}
