"use client";

import { useActionState } from "react";

import {
  initialSubscribeState,
  subscribe,
  type SubscribeState,
} from "@/lib/subscribe/action";

export function SubscribeForm() {
  const [state, formAction, pending] = useActionState<SubscribeState, FormData>(
    subscribe,
    initialSubscribeState,
  );

  if (state.status === "success") {
    return (
      <p className="text-base text-zinc-900 dark:text-zinc-100">
        Thanks — you&apos;re subscribed.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex w-full max-w-md flex-col gap-3">
      <label
        htmlFor="subscribe-email"
        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
      >
        Subscribe to the newsletter
      </label>
      <div className="flex gap-2">
        <input
          id="subscribe-email"
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {pending ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
    </form>
  );
}
