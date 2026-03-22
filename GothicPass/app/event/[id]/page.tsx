"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Navbar } from "../../components/navbar";
import { MOCK_EVENTS } from "../../data/events";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const event = MOCK_EVENTS.find((e) => e.id === id);

  const [mintState, setMintState] = useState<
    "idle" | "loading" | "success"
  >("idle");

  if (!event) {
    return (
      <div className="min-h-screen bg-zinc-950 text-gray-100">
        <Navbar />
        <div className="flex h-64 items-center justify-center text-gray-500">
          Evento no encontrado.{" "}
          <Link href="/" className="ml-2 text-purple-400 underline">
            Volver
          </Link>
        </div>
      </div>
    );
  }

  const soldPct = Math.round(
    ((event.total - event.available) / event.total) * 100
  );

  // ─── Mock mint handler ───────────────────────────────────────────────────
  async function handleMint() {
    console.log("🎟️  Iniciando transacción… [Anchor hook se conectará aquí]");
    setMintState("loading");
    // Simulated 2-second transaction delay
    await new Promise((r) => setTimeout(r, 2000));
    setMintState("success");
    console.log("✅ NFT Ticket mintado con éxito (simulación)");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 pb-24">
        {/* Back button */}
        <div className="sticky top-[57px] z-40 -mx-4 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-md">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {event.title}
          </Link>
        </div>

        {/* ─── POSTER ─── */}
        <div className="relative mt-4 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, 672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>

        {/* ─── GENRE BADGE ─── */}
        <div className="mt-4">
          <span className="rounded-full border border-purple-700/60 bg-purple-900/30 px-3 py-1 text-xs font-medium text-purple-300">
            {event.genre}
          </span>
        </div>

        {/* ─── TITLE ─── */}
        <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
          {event.title}
        </h1>

        {/* ─── DETAILS GRID ─── */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            { icon: Calendar, label: "Fecha", value: event.date },
            { icon: Clock, label: "Hora", value: event.time },
            { icon: MapPin, label: "Ubicación", value: event.location },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className={`rounded-xl border border-zinc-800 bg-zinc-900 p-3 ${
                label === "Ubicación" ? "col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-gray-500">
                <Icon className="h-3 w-3" />
                {label}
              </div>
              <p className="mt-1 text-sm font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* ─── ABOUT ─── */}
        <div className="mt-5">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-400">
            Sobre este evento
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            {event.description}
          </p>
        </div>

        {/* ─── AVAILABILITY ─── */}
        <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              Disponibilidad
            </span>
            <span className="font-medium text-purple-300">
              {event.total - event.available}/{event.total} entradas vendidas
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-700 to-purple-400 transition-all"
              style={{ width: `${soldPct}%` }}
            />
          </div>
        </div>

        {/* ─── PRICE ─── */}
        <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-[11px] uppercase tracking-widest text-gray-500">
            Precio del Ticket
          </p>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-white">
              {event.price}
            </span>
            <span className="text-lg font-bold text-purple-400">SOL</span>
            <span className="ml-auto text-sm text-gray-500">
              ≈ ${event.priceUSD.toFixed(2)} USD
            </span>
          </div>
        </div>

        {/* ─── MINT CTA (sticky bottom) ─── */}
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800 bg-zinc-950/90 px-4 pb-6 pt-4 backdrop-blur-md">
          <div className="mx-auto max-w-2xl">
            <button
              id="btn-mint-nft"
              onClick={handleMint}
              disabled={mintState === "loading" || mintState === "success"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-4 text-base font-bold text-white shadow-[0_0_20px_-4px_rgba(147,51,234,0.7)] transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {mintState === "idle" && (
                <>🎟️ Comprar Entrada (Mint NFT) · {event.price} SOL</>
              )}
              {mintState === "loading" && (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Procesando transacción…
                </>
              )}
              {mintState === "success" && (
                <>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  ¡NFT Mintado con Éxito!
                </>
              )}
            </button>
            {mintState === "success" && (
              <Link
                href="/tickets"
                className="mt-3 block text-center text-sm text-purple-400 underline"
              >
                Ver en Mis Pases →
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
