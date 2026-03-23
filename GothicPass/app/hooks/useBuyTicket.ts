"use client";

import { useState, useCallback } from "react";
import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import idl from "../../src/idl/nf_ts_pass.json";

// ─── Constants ────────────────────────────────────────────────────────────────
// Note: programId is read from idl.metadata.address in Anchor ≥ 0.30.
// No need to declare a separate PROGRAM_ID constant for Program construction.

/**
 * Dirección de tesorería que recibe los 0.1 SOL de cada compra.
 * ⚠️  Reemplaza esta dirección por la de tu wallet de Phantom definitiva
 *     antes de pasar a Mainnet.
 */
const TREASURY = new PublicKey("6kHSVi4RmMVV5SJxtWvMBzzCaWAbFumo5MwmzAsBWYav");

/** Conexión directa a Devnet usando web3.js v1 (compatible con Anchor). */
const DEVNET_CONNECTION = new Connection(
  clusterApiUrl("devnet"),
  "confirmed",
);

// ─── Types ────────────────────────────────────────────────────────────────────
export type BuyState = "idle" | "loading" | "success" | "error";

export interface UseBuyTicketReturn {
  buyTicket: (ticketName: string) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  state: BuyState;
  error: string | null;
  txSignature: string | null;
  reset: () => void;
}

// ─── Bridge helper ────────────────────────────────────────────────────────────
/**
 * Devuelve el provider de Phantom (window.solana) si está disponible.
 * Este objeto ya es compatible con AnchorProvider porque expone
 * `.publicKey` y `.signTransaction`.
 */
function getPhantomProvider(): anchor.Wallet | null {
  if (typeof window === "undefined") return null;
  const phantom = (window as unknown as { solana?: anchor.Wallet }).solana;
  return phantom ?? null;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
/**
 * useBuyTicket
 *
 * Encapsula la lógica para llamar a `buy_ticket` en el programa Anchor.
 * Usa el bridge con window.solana (Phantom/Solflare) para compatibilidad
 * con el nuevo Solana Kit (@solana/react-hooks).
 *
 * @example
 * const { buyTicket, isLoading, isSuccess, error } = useBuyTicket();
 * await buyTicket("Noche Gótica");
 */
export function useBuyTicket(): UseBuyTicketReturn {
  const [state, setState] = useState<BuyState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);

  const buyTicket = useCallback(async (ticketName: string) => {
    const phantomWallet = getPhantomProvider();

    // Guard: wallet must be connected
    if (!phantomWallet?.publicKey) {
      setError("Wallet no conectada. Por favor conecta tu wallet primero.");
      setState("error");
      return;
    }

    setState("loading");
    setError(null);
    setTxSignature(null);

    try {
      // Build AnchorProvider using Phantom as the wallet signer
      const provider = new anchor.AnchorProvider(
        DEVNET_CONNECTION,
        phantomWallet,
        { commitment: "confirmed", preflightCommitment: "confirmed" },
      );

      // Anchor 0.32: 2-arg constructor — programId from idl.metadata.address
      const program = new anchor.Program(
        idl as unknown as anchor.Idl,
        provider,
      );

      // Call buy_ticket on-chain
      const signature = await program.methods
        .buyTicket(ticketName)
        .accounts({
          user: phantomWallet.publicKey,
          treasury: TREASURY,
        })
        .rpc();

      setTxSignature(signature);
      console.log(
        "✅ Transacción confirmada:",
        `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
      );
      setState("success");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Error desconocido en la transacción.";
      console.error("❌ Error en buyTicket:", err);
      setError(message);
      setState("error");
    }
  }, []);

  const reset = useCallback(() => {
    setState("idle");
    setError(null);
    setTxSignature(null);
  }, []);

  return {
    buyTicket,
    isLoading: state === "loading",
    isSuccess: state === "success",
    isError: state === "error",
    state,
    error,
    txSignature,
    reset,
  };
}
