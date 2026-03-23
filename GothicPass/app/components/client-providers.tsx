"use client";

/**
 * ClientProviders
 *
 * Wrapper Client Component that dynamically loads the Solana wallet providers
 * with `ssr: false`. This prevents @solana/react-hooks from trying to run
 * browser-only hooks (useMemo, etc.) during server-side prerendering.
 *
 * Usage: import this in the Server Component layout.tsx instead of Providers.
 */

import dynamic from "next/dynamic";
import type { PropsWithChildren } from "react";

const Providers = dynamic(
  () => import("./providers").then((m) => m.Providers),
  {
    ssr: false,
    // Render children immediately so layout doesn't flash blank during hydration
    loading: () => <>{}</>,
  },
);

export function ClientProviders({ children }: PropsWithChildren) {
  return <Providers>{children}</Providers>;
}
