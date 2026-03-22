"use client";

import Image from "next/image";
import Link from "next/link";
import { useWalletConnection } from "@solana/react-hooks";
import { Calendar, MapPin, Users, Ticket, ArrowRight, Zap } from "lucide-react";
import { Navbar } from "./components/navbar";
import { MOCK_EVENTS } from "./data/events";

export default function Home() {
  const { status } = useWalletConnection();
  const isConnected = status === "connected";

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pb-20">
        {/* ─── HERO ─── */}
        <section className="py-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-800/60 bg-purple-900/20 px-4 py-1.5 text-xs font-medium text-purple-300">
            <Zap className="h-3.5 w-3.5" />
            Powered by Solana Devnet
          </div>
          <h1 className="mt-3 bg-gradient-to-br from-white via-purple-200 to-purple-400 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl">
            Underground NFT<br />Ticketing on Solana
          </h1>
          <p className="mt-4 text-sm text-gray-400">
            Eliminate middlemen, secure your digital memory.
          </p>

          {/* Wallet status banner */}
          <div
            className={`mx-auto mt-8 max-w-sm rounded-2xl border px-5 py-4 text-sm transition-all ${
              isConnected
                ? "border-purple-700/60 bg-purple-900/20"
                : "border-zinc-800 bg-zinc-900"
            }`}
          >
            {isConnected ? (
              <div>
                <p className="font-semibold text-purple-300">
                  ✦ Wallet Conectada
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  Explora los eventos a continuación
                </p>
              </div>
            ) : (
              <div>
                <p className="font-semibold text-gray-200">
                  Conecta tu wallet para empezar
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Compatible con Phantom y Solflare
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ─── EVENTS GRID ─── */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight text-white">
              Próximos Eventos Underground
            </h2>
            <Link
              href="/tickets"
              className="flex items-center gap-1 text-xs text-purple-400 transition hover:text-purple-300"
            >
              Mis Tickets
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {MOCK_EVENTS.map((event) => (
              <Link
                key={event.id}
                href={`/event/${event.id}`}
                className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-purple-700/70 hover:shadow-[0_0_30px_-8px_rgba(147,51,234,0.4)]"
              >
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  {/* Price badge */}
                  <span className="absolute right-3 top-3 rounded-full bg-purple-700 px-2.5 py-0.5 text-xs font-bold text-white shadow-lg">
                    {event.price} SOL
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-white group-hover:text-purple-200 transition">
                    {event.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {event.date.split(",")[0].replace("April", "Apr")}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location.split(",")[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.available}/{event.total}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── FOOTER NOTE ─── */}
        <p className="mt-12 text-center text-xs text-zinc-600">
          GothicPass · Solana Devnet · Hackathon WayLearn 2026
        </p>
      </main>
    </div>
  );
}
