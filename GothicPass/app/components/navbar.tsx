"use client";

import Link from "next/link";
import { useWalletConnection } from "@solana/react-hooks";
import { Ticket, Zap } from "lucide-react";

export function Navbar() {
  const { wallet, status, connectors, connect, disconnect } =
    useWalletConnection();

  const address = wallet?.account.address.toString();
  const shortAddress = address
    ? `${address.slice(0, 4)}…${address.slice(-4)}`
    : null;

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-700">
            <Ticket className="h-4 w-4 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-wide text-white">
              NFTsPass
            </p>
            <p className="text-[10px] text-purple-400">Gothic Edition</p>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/tickets"
            className="hidden items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-gray-300 transition hover:border-purple-600 hover:text-purple-300 sm:flex"
          >
            <Ticket className="h-3.5 w-3.5" />
            Mis Pases
          </Link>

          {status === "connected" && shortAddress ? (
            <button
              onClick={() => disconnect()}
              className="flex items-center gap-1.5 rounded-lg border border-purple-700 bg-purple-900/40 px-3 py-1.5 text-xs font-medium text-purple-300 transition hover:bg-purple-800/50"
            >
              <Zap className="h-3 w-3" />
              {shortAddress}
            </button>
          ) : (
            <button
              disabled={status === "connecting"}
              onClick={() => connectors[0] && connect(connectors[0].id)}
              className="flex items-center gap-1.5 rounded-lg bg-purple-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-600 disabled:opacity-60"
            >
              <Zap className="h-3 w-3" />
              {status === "connecting" ? "Conectando…" : "Conectar Wallet"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
