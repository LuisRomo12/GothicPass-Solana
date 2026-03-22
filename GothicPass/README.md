# 🎟️ GothicPass — NFT Ticketing on Solana

> **Hackathon WayLearn · Solana LATAM 2026**

GothicPass es una dApp de *ticketing* descentralizado para eventos de la escena musical **underground y gótica**. Los boletos se emiten como NFTs en la blockchain de Solana, eliminando intermediarios y garantizando autenticidad en cada entrada.

---

## ✨ Features

- 🌑 **Dark Gothic UI** — Diseño oscuro (zinc-950) con acentos morados y tipografía moderna
- 🔗 **Conexión de Wallet** — Compatible con Phantom y Solflare vía `@solana/react-hooks`
- 🎪 **Exploración de Eventos** — Grid de eventos underground con imagen, precio en SOL y disponibilidad
- 🎟️ **Minting de NFT** — Botón "Comprar Entrada (Mint NFT)" con estado de carga y éxito (listo para Anchor)
- 📱 **Mobile-First** — Diseño responsivo pensado para escanear en la puerta del evento
- 📲 **Mis Pases Digitales** — Inventario de NFTs con diseño de ticket stub perforado y QR Code

---

## 🛠 Tech Stack

| Tecnología | Versión | Uso |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.1.5 | Framework React (App Router) |
| [Tailwind CSS](https://tailwindcss.com/) | v4 | Estilos utility-first |
| [@solana/react-hooks](https://github.com/solana-foundation/framework-kit) | ^1.1.5 | Wallet connection |
| [@solana/client](https://github.com/solana-foundation/framework-kit) | ^1.2.0 | Cliente RPC para Devnet |
| [lucide-react](https://lucide.dev/) | latest | Íconos |
| TypeScript | ^5 | Tipado estático |

---

## 📁 Estructura del Proyecto

```
GothicPass/
├── app/
│   ├── components/
│   │   ├── navbar.tsx          # Navbar compartida con estado de wallet
│   │   └── providers.tsx       # SolanaProvider (Devnet)
│   ├── data/
│   │   └── events.ts           # Datos mock de eventos y tickets
│   ├── event/
│   │   └── [id]/
│   │       └── page.tsx        # Vista de detalle del evento (Mint UI)
│   ├── tickets/
│   │   └── page.tsx            # Mis Pases Digitales (inventario NFT + QR)
│   ├── globals.css             # Tema gótico oscuro global
│   ├── layout.tsx              # Layout raíz con metadata y Providers
│   └── page.tsx                # Home — Hero + grid de eventos
├── next.config.ts
├── package.json
└── README.md
```

---

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js >= 18
- npm >= 9

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/GothicPass-Solana.git
cd GothicPass-Solana/GothicPass
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Correr en desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 4. Build de producción
```bash
npm run build
npm run start
```

---

## 🌐 Red (Network)

La app está configurada para conectarse a **Solana Devnet**:

```ts
// app/components/providers.tsx
const client = createClient({
  endpoint: "https://api.devnet.solana.com",
  walletConnectors: autoDiscover(),
});
```

Para obtener SOL de prueba en Devnet: [faucet.solana.com](https://faucet.solana.com/)

---

## 🔗 Integración con Smart Contract (Anchor)

El punto de integración con tu programa de Anchor está marcado en `app/event/[id]/page.tsx` dentro de la función `handleMint()`:

```ts
async function handleMint() {
  console.log("🎟️  Iniciando transacción… [Anchor hook se conectará aquí]");
  setMintState("loading");

  // TODO: Reemplaza esto con la llamada real al programa:
  // const tx = await program.methods
  //   .mintTicket(eventId, price)
  //   .accounts({ ... })
  //   .rpc();

  await new Promise((r) => setTimeout(r, 2000)); // simulación
  setMintState("success");
}
```

El botón ya maneja los 3 estados de transacción: `idle → loading → success`.

---

## 📱 Vistas de la App

### 🏠 Home (`/`)
Hero con gradiente, banner de estado de wallet y grid de eventos próximos con precio en SOL.

### 🎪 Detalle de Evento (`/event/[id]`)
Póster del evento, detalles (fecha, hora, ubicación), barra de disponibilidad, precio y el botón sticky de **Mint NFT**.

### 🎟️ Mis Pases (`/tickets`)
Inventario de NFTs del usuario. Cada ticket muestra un diseño de "ticket stub" perforado con un **QR Code** listo para ser escaneado en la puerta del evento.

---

## 📜 Scripts

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | Linting con ESLint |
| `npm run format` | Formateo con Prettier |

---

## 🤝 Equipo

Proyecto desarrollado para el **Hackathon WayLearn · Solana LATAM 2026**.

- **Frontend** — Next.js + Tailwind + Solana Wallet Adapter UI
- **Smart Contract** — Programa Anchor en Rust (Devnet) *(en desarrollo)*

---

## 📄 Licencia

MIT © 2026 GothicPass Team
