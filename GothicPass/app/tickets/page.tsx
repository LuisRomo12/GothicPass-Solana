"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Ticket,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "../components/navbar";
import { MOCK_TICKETS } from "../data/events";

// ─── Fake QR (SVG pattern) ────────────────────────────────────────────────
function FakeQRCode() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="100" height="100" fill="white" />
      {/* Top-left finder */}
      <rect x="5" y="5" width="25" height="25" rx="2" fill="black" />
      <rect x="9" y="9" width="17" height="17" rx="1" fill="white" />
      <rect x="13" y="13" width="9" height="9" rx="1" fill="black" />
      {/* Top-right finder */}
      <rect x="70" y="5" width="25" height="25" rx="2" fill="black" />
      <rect x="74" y="9" width="17" height="17" rx="1" fill="white" />
      <rect x="78" y="13" width="9" height="9" rx="1" fill="black" />
      {/* Bottom-left finder */}
      <rect x="5" y="70" width="25" height="25" rx="2" fill="black" />
      <rect x="9" y="74" width="17" height="17" rx="1" fill="white" />
      <rect x="13" y="78" width="9" height="9" rx="1" fill="black" />
      {/* Data modules (random pattern) */}
      {[
        [38,5],[42,5],[50,5],[58,5],[62,5],
        [38,9],[46,9],[54,9],[66,9],
        [34,13],[42,13],[50,13],[58,13],[66,13],
        [34,17],[38,17],[54,17],[62,17],
        [34,21],[42,21],[50,21],[58,21],[66,21],
        [5,34],[13,34],[21,34],[29,34],[37,34],[45,34],[53,34],[61,34],[69,34],[77,34],[85,34],[93,34],
        [5,38],[13,38],[29,38],[37,38],[53,38],[69,38],[77,38],[93,38],
        [5,42],[9,42],[21,42],[33,42],[45,42],[57,42],[69,42],[81,42],[93,42],
        [5,46],[17,46],[29,46],[41,46],[53,46],[65,46],[77,46],[89,46],
        [5,50],[9,50],[21,50],[33,50],[45,50],[57,50],[69,50],[81,50],[93,50],
        [5,54],[13,54],[29,54],[45,54],[61,54],[77,54],[93,54],
        [5,58],[9,58],[17,58],[25,58],[37,58],[49,58],[61,58],[73,58],[85,58],[93,58],
        [38,66],[42,66],[54,66],[66,66],[70,66],[78,66],[90,66],
        [34,70],[46,70],[58,70],[62,70],[74,70],[82,70],[90,70],
        [34,74],[38,74],[50,74],[66,74],[78,74],[86,74],
        [38,78],[46,78],[54,78],[62,78],[70,78],[78,78],[90,78],
        [34,82],[42,82],[50,82],[58,82],[74,82],[82,82],
        [34,86],[38,86],[46,86],[54,86],[62,86],[70,86],[86,86],[90,86],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="4" height="4" fill="black" />
      ))}
    </svg>
  );
}

// ─── Ticket Stub Card ─────────────────────────────────────────────────────
function TicketStubCard({
  ticket,
  onSelect,
  selected,
}: {
  ticket: (typeof MOCK_TICKETS)[0];
  onSelect: () => void;
  selected: boolean;
}) {
  const { event } = ticket;
  return (
    <button
      onClick={onSelect}
      className={`group relative w-full overflow-hidden rounded-2xl border text-left transition ${
        selected
          ? "border-purple-600 ring-1 ring-purple-600"
          : "border-zinc-800 hover:border-zinc-600"
      } bg-zinc-900`}
    >
      {/* Image strip */}
      <div className="relative h-32 w-full overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
        {selected && (
          <div className="absolute right-2 top-2 rounded-full bg-purple-600 p-0.5">
            <CheckCircle2 className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-3">
        <p className="text-xs font-bold text-purple-300 group-hover:text-purple-200 transition line-clamp-2 leading-snug">
          {event.title}
        </p>
        <div className="mt-1.5 flex items-center gap-1 text-[11px] text-gray-500">
          <Calendar className="h-3 w-3 flex-shrink-0" />
          {event.date.replace("April", "Apr").split(",")[0]}
        </div>
      </div>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function TicketsPage() {
  const tickets = MOCK_TICKETS; // In production: fetch user's NFTs from chain
  const [selectedId, setSelectedId] = useState<string | null>(
    tickets.length > 0 ? tickets[0].id : null
  );

  const selectedTicket = tickets.find((t) => t.id === selectedId);

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pb-20">
        {/* Header */}
        <div className="sticky top-[57px] z-40 -mx-4 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Mis Pases Digitales
            </Link>
            {tickets.length > 0 && (
              <span className="rounded-full bg-purple-800/50 px-2.5 py-0.5 text-xs font-semibold text-purple-200">
                {tickets.length} Ticket{tickets.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {/* Empty state */}
        {tickets.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900">
              <Ticket className="h-8 w-8 text-zinc-600" />
            </div>
            <p className="text-base font-semibold text-gray-300">
              Aún no tienes entradas
            </p>
            <p className="text-sm text-gray-500">
              Explora eventos y compra tu primer NFT Ticket.
            </p>
            <Link
              href="/"
              className="mt-2 rounded-xl bg-purple-700 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-purple-600"
            >
              Explorar Eventos
            </Link>
          </div>
        )}

        {/* Ticket list + detail */}
        {tickets.length > 0 && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            {/* ─── Grid ─── */}
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-gray-500">
                Selecciona un pase
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
                {tickets.map((t) => (
                  <TicketStubCard
                    key={t.id}
                    ticket={t}
                    selected={t.id === selectedId}
                    onSelect={() => setSelectedId(t.id)}
                  />
                ))}
              </div>
            </div>

            {/* ─── Detail / QR ─── */}
            {selectedTicket && (
              <div className="flex flex-col gap-4">
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Tu pase
                </p>

                {/* Ticket stub card */}
                <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-[0_0_40px_-10px_rgba(147,51,234,0.35)]">
                  {/* Top strip with event info */}
                  <div className="bg-purple-900/60 px-5 pt-5 pb-4">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-purple-300">
                      NFT TICKET #{selectedTicket.id.split("-").pop()}
                    </p>
                    <h2 className="mt-1 text-xl font-extrabold leading-tight text-white">
                      {selectedTicket.event.title}
                    </h2>
                    <div className="mt-2 flex flex-col gap-1 text-sm text-purple-200">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {selectedTicket.event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {selectedTicket.event.location}
                      </span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <span className="rounded-full border border-purple-600/60 bg-purple-800/40 px-2.5 py-0.5 text-xs text-purple-200">
                        {selectedTicket.event.price} SOL
                      </span>
                      <span className="rounded-full border border-purple-600/60 bg-purple-800/40 px-2.5 py-0.5 text-xs text-purple-200">
                        {selectedTicket.event.genre}
                      </span>
                    </div>
                  </div>

                  {/* Perforated separator */}
                  <div className="relative flex items-center py-1">
                    <div className="absolute -left-3 h-6 w-6 rounded-full bg-zinc-950" />
                    <div className="flex-1 border-t-2 border-dashed border-zinc-700 mx-5" />
                    <div className="absolute -right-3 h-6 w-6 rounded-full bg-zinc-950" />
                  </div>

                  {/* QR code section */}
                  <div className="px-5 pb-5 pt-2">
                    <div className="flex justify-center">
                      <div className="h-52 w-52 overflow-hidden rounded-2xl border-4 border-white p-2 shadow-md">
                        <FakeQRCode />
                      </div>
                    </div>
                    <p className="mt-3 text-center text-xs font-semibold text-purple-400">
                      Presenta este código en la puerta
                    </p>
                    <p className="mt-0.5 text-center font-mono text-[10px] text-zinc-500">
                      {selectedTicket.tokenId}
                    </p>

                    {/* Footer */}
                    <div className="mt-4 flex justify-between border-t border-zinc-800 pt-3 text-[11px] text-zinc-500">
                      <span>Purchased</span>
                      <span>{selectedTicket.purchasedAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
